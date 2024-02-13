## Starting it 🚀

`npm install` to install to install dependencies
`npm start` to start the app locally

**To run the exam for the whole lab (CCFL3) was used in ureckon 2023.**

- Connect laptop to the main LAN
- Internet connection to be turned off
- `npm run build` to build the app
- `npx serve -s build` to serve the app
- To open the app in any other computer through LAN, open the browser and type `http://<ip-address>:5000`


## Questions ❓

The questions can be downloaded from Debugger's admin panel. The questions are in the form of a JSON file. The JSON file is downloaded and stored in the `src/assets/questions` folder. The questions are then loaded from the `questions` folder.

## Timer ⏳

The timer is set in `src/context/examContext.js`. The timer is set to `useState(30 * 60 * 1000);` which is 30 minutes. The timer is set to 30 minutes for testing purposes. The timer can be set to any value.

## Submitting the exam ✅

The exam once submitted we are showing the Score, Attempted, Unattempted questions. It's all stored in localstorage and sessionstorage too.

## Demo 📹

