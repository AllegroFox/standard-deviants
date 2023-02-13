# Platform for Hosting Infinite Generativity

This was the final project for our [Lighthouse Labs Web Development Bootcamp](https://www.lighthouselabs.ca/en/web-development-bootcamp) (Toronto 2018-08-22 Cohort).  Inspired by [BeZerk's flash-game, Acrophobia](https://en.wikipedia.org/wiki/Acrophobia_(game)) and [JackBox-style party games](https://en.wikipedia.org/wiki/The_Jackbox_Party_Pack), the **Platform for Hosting Infinite Generativity** (PHIG) was conceived to be server for hosting language-based games in real-time using websockets.  Rather than build a single game, our goal was to build a platform into which rules modules could incorporated, allowing users to mix and match rounds for their friends.

**The Standard Deviants** responsible for this project were:
* [Emily McMinn](https://github.com/AllegroFox) (front-end, back-end)
* [Alfred Law](https://github.com/Alfred529) (database, back-end)
* [Danny Fekete](https://github.com/StandardGiraffe) (back-end, game modules)

Our **tech stack** was:
* **Front-end:** React, Bootstrap
* **Back-end:** Node.js, Express.js, and WebSockets with [ws](https://github.com/websockets/ws)
* **Database:** MongoDB

## Key Features

* **WebSockets** for real-time, simultaneous, interactive play using the [`ws`](https://github.com/websockets/ws) library
* **Two game modules implemented**: *Synonyms* and *Rhymes*
* **Automated answer-bank generation** for nearly limitless replayability
  * Both modules use the [`random-words`](https://github.com/apostrophecms/random-words) library to generate seed-words that are relatively common in English.
  * The *Rhymes* module uses the [DataMuse API](https://www.datamuse.com/api/) to populate a bank of valid rhymes
  * The *Synonyms* module originally used the [`cheerio`](https://cheerio.js.org/) web-scraping library to navigate the DOM of [thesaurus.com](https://thesaurus.com) queries.  This was an exciting but brittle approach, and in returning to this project in 2023, it was necessary to switch over to the DataMuse API for better sustainability.
  * Answer banks are persisted to the database to prevent unnecessary duplication of requests and are spooled ahead of games to minimize disruptions between rounds.
* **Persistent Daily Scoreboards** for each game type using MongoDB.
* Amusing, auto-generated (but consistent-by-name) avatars for players originally using the adorable.io Avatars API (now defunct, alas), now updated to the [DiceBear Thumbs API](https://dicebear.com/styles/thumbs).
* The **[Tim Johns](https://timjohns.ca) Confetti Period** follows each round with a magnitude of celebration proportional to how well players scored.  This feature was added at the request of a beloved Lighthouse Labs mentor who discovered the [`react-confetti`](https://github.com/alampros/react-confetti) library and invited us to use it.
* **A dynamic real-time scoreboard** using the [`react-flip-move`](https://github.com/joshwcomeau/react-flip-move) library that re-arranges itself during frantic game play for Heightened Emotional Impact, etc.

## Operation

> :warning: **Warning:** This project was written in 2018 and uses dependencies with versions from that time.  Installing those dependencies raises several vulnerability alerts in 2023, but updating them, tracking down breaking changes, and getting everything up and running again is currently beyond the scope of this restoration-for-demonstration-purposes.
> Therefore, **this project is not secure**.  Beyond enjoying it with friends, please do not attempt to host it perpetually, especially on sensitive or personal hardware.

### Requirements

* **Node.js** (here running on `18.12.1`, but could probably run on older)
* **MongoDB** (here running on `4.2.13`, but could probably run on newer)

### Installation

> **Note:** the structure of the project is a bit weird in that it contains both the server and client components in `./server` and `./client` respectively.  Each of these components has their own `package.json` and will need to be running during operation.  The instructions below will walk you through the process.

1. **Clone the repository:**

  ```bash
  $ git clone https://github.com/AllegroFox/standard-deviants.git phig
  $ cd phig
  ```

2. Install dependencies for **both** the components.  It will be necessary to ignore dependency vulnerability warnings.

  ```bash
  phig $ cd server
  phig/server  $ npm install

  # ...

  phig/server  $ cd ../client
  phig/client  $ npm install
  ```

### Configuration

* **Optionally:** You can set which game modules will play by uncommenting the desired playstyle in `server/game/Room.js` at the beginning of `startGetReady()`:

  ```js
  // server/game/Room.js

  // ...

    // #############################
    // #############################
    //  Round Lifecycle Controllers
    // #############################
    // #############################

    async startGetReady() {
      // Normal, random mode:
      // this.round = new this.gameModes[Math.floor(Math.random() * this.gameModes.length)](this.messager);

      // Rhyme-mode only, for n3wbz:
      // this.round = new RoundRhymes(this.messager);

      // Synonym-mode only, for l33tz:
      // this.round = new RoundSynonyms(this.messager);

      // Alternating modes:
      this.round = (this.roundNumber % 2) ? new RoundRhymes(this.messager) : new RoundSynonyms(this.messager);
  ```

### Start

To start the game, both the server and the client need to be running at the same time.  The easiest way to do this is to run the startup script in `client/package.json`:

```bash
phig/client  $ npm start
```

In addition to starting up the game, this will open a browser window on the local machine to the client at `localhost:3000`.

### Multiplayer and Hosting

The game isn't much fun alone.  If there are players on your **local network**, they can join you by navigating to your local IP address at port `3000`.  (For example, `192.168.2.15:3000`).

At present, playing online is possible, but it takes some doing.  Basic tunnelling services like [localtunnel](https://github.com/localtunnel/localtunnel) don't support websockets, and while [ngrok](https://ngrok.com/) does, a paid account is necessary to host the two tunnels needed to expose the client and the server.  The following is the solution I've found (with much gratitude to present-day [Tim Johns](https://timjohns.ca) and Brian Estany for helping me get here).

#### Additional Requirements for Hosting Online

* ngrok installed (a free account is fine)
* Three terminal windows (for maximum impressiveness)

#### Procedure

1. **Before starting the server or client**, in the **first** of your three terminal windows, run ngrok in Transmission Control Protocol-mode, pointing at PHIG's server's port (default `3001`):

    ```terminal
    $ ngrok tcp 3001

    ngrok                                               (Ctrl+C to quit)

    Visit http://localhost:4040/ to inspect, replay, and modify your req

    Session Status                online
    Account                       Some Account Name (Plan: Free)
    Version                       3.0.5
    Region                        United States (us)
    Latency                       32ms
    Web Interface                 http://127.0.0.1:4040
    Forwarding                    tcp://2.tcp.ngrok.io:10830 -> localhost

    Connections                   ttl     opn     rt1     rt5     p50
                                  0       0       0.00    0.00    0.00
    ```

    This will make a websocket-compatible tunnel available for the server, once it starts.

2. **Copy the forwarding address without its protocol prefix** shown in the resulting ngrok status readout.  In the example above, this would be `2.tcp.ngrok.io:10830`.

    > **NOTE:** The address will change every time you restart ngrok unless you have a paid account.

3. In `./hosting-config.json`, set the `remote_address` key to that forwarding address:

    ```json
    {
      "remote_address": "2.tcp.ngrok.io:10830"
    }
    ```

4. In the **second** of your three terminal windows, **start the PHIG application**:

    ```bash
    phig/client  $ npm start
    ```

5. In the **third** of your three terminal windows, use **localtunnel** to expose the PHIG client with either the `npx` application runner or a local installation, as desired:

    > **NOTE:** You will need your local IP address for localtunnel's `--local-host` parameter.  You can grab it quickly with `hostname -I`.

    > **NOTE:** localtunnel allows you to request a `--subdomain`, which will provide a more convenient forwarding address if available.  In the example below, `phig` is used.

    ```shell
    $ hostname -I
    192.168.X.Y

    $ npx localtunnel --local-host 192.168.X.Y --port 3000 --subdomain phig

    your url is: https://phig.loca.lt
    ```

6. It will be necessary to share the **unsecure** `HTTP` version of the provided address (`http://phig.loca.lt`, rather than `https://phig.loca.lt` in the example above).  Testing has shown that it's often helpful for those who wish to join to be using Chrome (as Firefox seems to resist connecting to the unsecure protocol).  With all that out of the way, have fun!
