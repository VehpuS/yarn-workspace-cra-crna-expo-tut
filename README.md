# Tutorial for yarn workspaces with cra + crna / expo

Playing around with yarn workspaces, cra, crna, expo - based on [Ben Awad's video tutorial](https://www.youtube.com/watch?v=iM4NRM2diPc&list=PLN3n1USn4xll1d97ZtIk2t7UpSxWGdIn5&index=2) and this [Medium article](https://medium.com/viewstools/how-to-use-yarn-workspaces-with-create-react-app-and-create-react-native-app-expo-to-share-common-ea27bc4bad62).

## Changes from Ben Awad's tutorial

* `create-react-native-app` is now completely replaced by [expo](https://docs.expo.io/versions/v32.0.0/workflow/up-and-running/) - so I just use it.
* I made `./packages/web/config-overrides.js` more lean.
* I make my own change to `App.js` in the web and app (because the template has changed with `react-scripts@2.0.0`).
* I change the "main" entery in `./packages/app/package.json`.
* I do not change `app.json` at all.

## How to set this up

### Init all packages

1. Create the packages directory (`mkdir packages`).
2. In the directory, create the web and app packages:
    * `cd packages`
    * `npx create-react-app web`
    * `yarn global add expo-cli && expo init`
        * I chose to name the project app to fit with the tutorial video.
3. Create the root `package.json` with the content `{ "private": true, "workspaces": [ "packages/*" ] }`.
4. Create a `common` folder in packages.
5. Add to common a `package.json` file: `{ "name": "@yarn-workspace-cra-crna-expo-tut/common", "version": "1.0.0", "main": "index.js", "license": "MIT" }`.
6. Add to common a basic `index.js` file containing an exported function (`export const add = (a,b) => a + b;`).

### Making the web app work with the common package

1. Add to devDependencies to the web app:
    * `cd packages/web`
    * `yarn add --dev react-app-rewire-yarn-workspaces react-app-rewired`
2. In `./packges/web/packages.json` change the four scripts using `react-scripts` to use `react-app-rewired` instead.
    * \-    "start": "react-scripts start",
    * \+    "start": "react-app-rewired start",
    * \-    "build": "react-scripts build",
    * \+    "build": "react-app-rewired build",
    * \-    "test": "react-scripts test",
    * \+    "test": "react-app-rewired test",
    * \-    "eject": "react-scripts eject"
    * \+    "eject": "react-app-rewired eject"
3. Add a file named `./packges/web/config-overrides.js` file, containing the following code: `module.exports = require("react-app-rewire-yarn-workspaces");`
4. Add `"@yarn-workspace-cra-crna-expo-tut/common": "1.0.0"` to the dependencies in `./packges/web/packages.json`.
5. Change `./packges/web/src/App.js` to use the function from the `common` package.
    * First, add `import { add } from '@yarn-workspace-cra-crna-expo-tut/common';` to the file.
    * Then change `Learn React` to `Learning React is like learning 1 + 1 = {add(1, 1)}`.
6. Run `yarn start` from within the web package to confirm this is working!

### Making the mobile app work with the common package

1. In `./packages/app/package.json` add `"name": "@yarn-workspace-cra-crna-expo-tut/app", "version": "1.0.0",`.
2. In the `app` package directory, run `yarn add --dev crna-make-symlinks-for-yarn-workspaces`.
3. Add a file called `./packages/app/link-workspaces.js` with this: `require('crna-make-symlinks-for-yarn-workspaces')(__dirname);`.
4. Add prestart script to `./packges/app/package.json`: `"prestart": "node link-workspaces.js",`.
5. Add `"@yarn-workspace-cra-crna-expo-tut/common": "1.0.0"` to the app package dependencies.
6. Change `App.js` in the app package to use the function from the `common` package.
    * First, add `import { add } from '@yarn-workspace-cra-crna-expo-tut/common';` to the file.
    * Then add `<Text>TEST: 1 + 1 = {add(1,1)}</Text>` to the App's `View` component.
7. In the root project, create a file named `App.js` with the contents
    * `import App from './packages/app/App';`
    * `export default App;`
8. Run `yarn start` from within the web package to confirm this is working!

## Other things to remember from learning to do this

* [Online live coding of a mobile app based on React Native](https://snack.expo.io).
