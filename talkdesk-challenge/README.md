# TalkdeskChallenge

This is an exercise for the Talkdesk recruitment process. 

## Exercise

Given the html template and the css stylesheet** we want you to build a working interface that has the following functionalities:

- List all the apps
- Paginate the list (page size = 3)
- Filter the apps as you type in the search bar
- Have all the existing categories in the left navigation sorted by alphabetic order
- Allow filtering of apps when we click on a category
- Apps should be sorted by ascending order of the sum of the plans price

## Input data

The input data should be fetched dynamically (like would you do if it was data from a REST API) from the provided json file that has a list of apps. 

Each app has:
- an identifier
- a name
- a descriptions
- one or more categories
- one or more subscriptions with a name and a price (in cents)

## Other notes

The exercise is done using [Angular](https://angular.io/) and the initial state was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

The implementation uses the `isDevMode()` to mockup the api requests.

The structure of the project is the following:
- environments folder contains the required configurations for the different environments and global values
- data folder is the sample data sent by Talkdesk
- app folder contains all the code important for the exercise.
  - components folder contains all the visual elements that will be used to show the data
  - services folder contains the logic methods to be used by the visual elements

In the environment files it's specified the following:
- `production` if environment is production or not
- `apiURL` the url for an to be used api 
- `totalItemsPerPage` the number of items per page (default: 3)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

