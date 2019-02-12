# Tutorial for yarn workspaces with cra + crna / expo

Playing around with yarn workspaces, cra, crna, expo - based on [Ben Awad's video tutorial](https://www.youtube.com/watch?v=iM4NRM2diPc&list=PLN3n1USn4xll1d97ZtIk2t7UpSxWGdIn5&index=2) and this [Medium article](https://medium.com/viewstools/how-to-use-yarn-workspaces-with-create-react-app-and-create-react-native-app-expo-to-share-common-ea27bc4bad62).

## Changes from Ben Awad's tutorial

* crna is now completely replaced by expo - so [I'll just use it](https://docs.expo.io/versions/v32.0.0/workflow/up-and-running/).

## How to set this up

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

## Other things to remember from learning to do this

* [Online live coding of a mobile app based on React Native](https://snack.expo.io).
