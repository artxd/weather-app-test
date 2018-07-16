# TEST ASSIGNMENT FOR FRONT-END INTERNSHIP IN MOONCASCADE
#### SUMMER 2018

The aim of the test assignment is to create a single-page weather app.

## Requirements for the application

1. The user should be able to search for a location, that he/she wants the weather prediction for.
2. Location offers are displayed in real time as the user types into the input.
3. The user should be able to select a location from a dropdown, that suggests different locations based on the search input.
4. After the user has selected a location, a detailed view of the weather on that day is shown.

## Non-mandatory tasks

1. Make the app responsive to a width of 320px.
2. Write tests for your app.

## Design

The app should look like the designs we have provided in https://scene.zeplin.io/project/5b473a0e6396e8127ef6dfd4.

Different icons for the designs are provided in `/src/icons/`.

## API

It is mandatory to use the following API to fetch data internship-proxy.aw.ee:3001.

| Endpoint | Description | Example |
|-|-|-|
| `/location` | With `query` as parameter gives you a list of the locations that correspond to the query string. | internship-proxy.aw.ee:3001/location?query=new |
| `/location/{woeid}` | `woeid` is one of the properties of a location. This request provides detailed weather information about a location. | internship-proxy.aw.ee:3001/location/2459115|

Both of the requests are made by using GET method. The API is based on https://www.metaweather.com/api/. In order to implement the designs, the weather state icons can be downloaded from there.

## Tech stack

- React
    - create-react-app setup provided in this repository, which you can modify in any way you feel necessary. Ejecting is discouraged, but if you really need to do it, we are interested in hearing you reasoning.
    - Any libraries you would like to use.
- Styling
    - Anything you feel comfortable with.
    - We suggest using syled-components.

## Submitting work

Push your submission to your own repository and send its URL to us. Please keep in mind to include a quick manual of how to run your work.
