🇺🇳 MUN Command Pro: Digital Dais Suite

MUN Command Pro is a high-performance, dual-screen interface designed for Model United Nations Dais members. It allows Chairs to manage speakers, timers, voting, and resolutions from a private dashboard while broadcasting a cinematic, real-time display to the committee via a projector.
🌟 Key Features

    Dual-Screen Sync: Uses the Broadcast Channel API to sync the Chair's laptop and the Projector tab instantly without a server.

    Calibrated Precision Timer: A timestamp-synced clock engine designed to prevent time-drift on older hardware (Windows 7/32-bit).

    Quorum & Majority Calculator: Real-time calculation of Simple Majority and Two-Thirds based on attendance.

    Resolution Drafter: Live-type resolutions and operative clauses to be displayed in a high-readability overlay on the big screen.

    Cinematic Projector UI: Features a pulse-ticker for bulletins, motion trackers, and a visual "shaking" alert for the final 10 seconds of speeches.

    Decentralized: Runs entirely locally via HTML5/JavaScript—no internet connection required during the conference.

🚀 Quick Start (Windows 7 / Legacy)

Since this app uses local communication, browsers require a slight configuration to allow "file-to-file" talk:

    Download: Save all files (index.html, chair.html, projector.html, style.css, script.js) into one folder.

    Browser Setup (Firefox):

        Open Firefox and type about:config in the address bar.

        Search for security.fileuri.strict_origin_policy.

        Set it to false.

        Restart Firefox.

    Launch: * Open index.html to enter the Gateway.

        Open Chair Dashboard in Tab 1.

        Open Projector View in Tab 2.

        Drag Tab 2 to your extended monitor/projector and press F11 for full screen.

🛠️ Technical Stack

    Frontend: HTML5, CSS3 (Glassmorphism UI)

    Logic: Vanilla JavaScript (ES6)

    Communication: Broadcast Channel API

    Design: Midnight Navy & Diplomatic Gold color palette with Cinzel and JetBrains Mono typography.

📋 Interface Guide
Chair Dashboard
Module	Function
Debate Timer	Manage GSL/Mod individual speaking times.
Quorum	Enter total present to auto-calculate voting thresholds.
Caucus Tracker	Set total time and topics for Moderated Caucuses.
Bulletin	Push urgent messages to the scrolling ticker on the projector.
Projector View
Element	Function
Speaker Display	High-visibility name of the recognized delegate.
Pulse Ticker	Displays active motions or administrative messages.
Resolution Overlay	Full-screen display of draft text for committee review.
⚖️ License

This project is open-source and free to use for any educational MUN conference.
