# PubSub (event bus) system

We want a very robust, scalable, and performant pub-sub system that can pass events within the tab, between tabs or windows (BroadcastChannel), and between devices (WebSockets, Server-Sent Events, etc.).

All events should publish custom events, which can be subscribed to by any interested party. This will allow for a flexible and extensible architecture where new event types can be added easily without modifying existing code.

The goal is the complete decoupling of event producers and consumers, enabling a more modular and maintainable codebase.

One key feature that MUST be implemented is the ability to listen for logout in other tabs/windows and to propagate that event to the current tab/window and to refresh the UI accordingly (show a login screen).
