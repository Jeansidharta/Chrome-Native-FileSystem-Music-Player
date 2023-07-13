# ⚠️ Deprecation warning ⚠️

This project probably does not work. It was first developen using an extremely experimental chrome feature that has changed a lot. This probably does not work anymore. I'll keep this repository as a future reference for myself. Anyone is free to use and clone it

# Web Music Player

Please, make sure you match at least the first two pre-requisites described below before trying to use the project.

## Introduction

This project is an experiment using the newest chrome Native FileSystem API. It is and API that allows for reading files and directories directly from the user's filesystem. This is a very new and unstable API, so anything written here is subject to change at any moment. It's currently most official docs can be found [here](https://wicg.github.io/native-file-system/#api-filesystemfilehandle), though they are also very volatile, and may change at any moment.

The core concept of this project is to create a simple Music Player that reads it's data directly from the user's filesystem. The app will ask the user to open a folder that contains music. The app will then list all found music and allow the user to select which one they want to play.

## Pre-requisites

First, you must be using Chrome. This code is currently being written using version 83.0.4103.116, 64bits of Chrome. It may or may not work in different versions, given how volitile this API currently is.

Second, you must set Chrome's Native File System API flag to `enabled`. Copy this in your URL bar: `chrome://flags/#native-file-system-api` to jump directly to the flag. Alternatively, you could just open `chrome://flags` and search for the flag there.

Third, you must have NodeJS and NPM installed.

## How to run

Run the following commands:

- `git clone https://github.com/Jeansidharta/Chrome-Native-FileSystem-Music-Player` - Clones the project
- `cd Chrome-Native-FileSystem-Music-Player` - Open the project folder
- `npm install` - Installs the project's dependencies
- `npm run dev` - runs the project
