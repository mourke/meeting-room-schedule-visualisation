# Meeting-Room-Schedule-Visualisation

![CI](https://github.com/mourke/meeting-room-schedule-visualisation/workflows/CI/badge.svg)


This project would be be to build a visualization that could run on a tablet to show the schedule of a meeting room, including whether it is currently booked, and when the next available free slot is.


## How to run

This project requires the [JetBrains WebStorm IDE](https://www.jetbrains.com/webstorm/download/) to run.
It also requires Node package manager. This should be installed by the WebStorm installer.

Click on File > Open and select this project folder.

Once loaded, go into the Packages.json file and there should be a popup in the bottom right hand side of the screen asking to install dependencies. If not, open the project folder and run `npm install`.

Once all the dependencies are downloaded, click the "play" button on the top right of the screen. This will spin up a web server and deploy the application. It should open Microsoft Edge once this is completed.

If you don't have edge or are on a mac, you may need to edit the scheme settings to open your default browser. 

NOTE: The development schema has only been tested on chromium browsers, so if possible, use Edge.
