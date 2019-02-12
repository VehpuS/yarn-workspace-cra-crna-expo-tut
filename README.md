# Tutorial for yarn workspaces with cra + crna / expo

Playing around with yarn workspaces, cra, crna, expo - based on [Ben Awad's video tutorial](https://www.youtube.com/watch?v=iM4NRM2diPc&list=PLN3n1USn4xll1d97ZtIk2t7UpSxWGdIn5&index=2) and this [Medium article](https://medium.com/viewstools/how-to-use-yarn-workspaces-with-create-react-app-and-create-react-native-app-expo-to-share-common-ea27bc4bad62).

## Changes from Ben Awad's tutorial

* `create-react-native-app` is now completely replaced by expo - so [I just use it](https://docs.expo.io/versions/v32.0.0/workflow/up-and-running/).
* I made `config-overrides.js` more lean.
* I made my own change to `App.js` in web (because the template has changed with `react-scripts@2.0.0`).

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

7. Add to devDependencies to the web app:
    * `cd packages/web`
    * `yarn add --dev react-app-rewire-yarn-workspaces react-app-rewired`
8. Change the four scripts using `react-scripts` to use `react-app-rewired` instead.
    * \-    "start": "react-scripts start",
    * \+    "start": "react-app-rewired start",
    * \-    "build": "react-scripts build",
    * \+    "build": "react-app-rewired build",
    * \-    "test": "react-scripts test",
    * \+    "test": "react-app-rewired test",
    * \-    "eject": "react-scripts eject"
    * \+    "eject": "react-app-rewired eject"
9.  Add a `config-overrides.js` file to your web package, re-exporting `rewireYarnWorspaces` from `react-app-rewire-yarn-workspaces`:
    * `module.exports = require("react-app-rewire-yarn-workspaces");`
10. Add `"@yarn-workspace-cra-crna-expo-tut/common": "1.0.0"` to the web package dependencies.
11. Change `App.js` in the web package to use the function from the `common` package.
    * First, add `import { add } from '@yarn-workspace-cra-crna-expo-tut/common';` to the file.
    * Then change `Learn React` to `Learning React is like learning 1 + 1 = {add(1, 1)}`.
12. Run `yarn start` from within the web package to confirm this is working!

## Other things to remember from learning to do this

* [Online live coding of a mobile app based on React Native](https://snack.expo.io).
