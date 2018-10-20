# System Update Window
A container that displays a list of system messages in reverse-chronological order.

## Props
sysMessages [{"content", "eventType"}]

## Logic
Renders each message object in sysMessages in reverse chronological order; may have some colour-coding logic sensitive to eventType.