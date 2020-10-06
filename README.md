# Anagram Web App

A single-page application that: 

1. Allows users to check whether two words are anagrams
2. Shows 10 most popular anagram requests across all users

## Commands

- `npm install` to build environment
- `npm run-script build` to compile files from `/src` file into `/dist` file
- `npm start` to spin up server (by default over localhost:8080)
- `npm test` to execute unit tests (if errors arise, try `npm test init` first)
- `npm run-script doc` to create documentation webpages in the `/doc` folder

## To begin

1. After cloning the repository, navigate to the repo folder and in command prompt, type:

   `npm install`

   `npm run-script build`

3. To ensure tests are passing, run:

   `npm test`

4. To spin up server (on localhost:8080 by default), run:

   `npm start`

   Then in your favourite browser, navigate to http://localhost:8080/

## Environment Variables

- `URL` - Web DNS where website exists

- `PORT` - Port to run on

- `NODE_ENV` - Node Environment (`production` || `development`)

  `console.log(process.env.PORT);`

## Views

Each view in `src/views` can be called by any number of endpoints. Each view has a doc string in the top of the file to for each required variable.

## Routes

All routes are defined in `RouterController.ts` and interact with the controllers from `src/controllers`.

## Documentation

All documentation can be populated with `npm run doc` and can be viewed in browser from `/doc/index.html`

## Prerequisites

Note that the web application requires the following libraries and their dependents:

- dotenv
- express
- express-session
- pug
- simple-spellchecker
- sqlite3
- typescript

## Authorship

- **Jamie Sgro** - *Developer*