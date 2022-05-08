# drupal-graphql-with-angular-and-apollo

This is the Angular code that corresponds to the blog post series posted [here](http://joaogarin.com/posts/drupal-graphql-with-angular-and-apollo-part1)

## Configuration

Go to the folder src/environments and set the contenta URL to your own contenta installation.

```
export const environment = {
  production: false,
  contenta_url: 'http://contenta.local',
  graphql: '/graphql',
};
```

Go to the folder src/app and in the file auth.config.ts provide your own clientId : 

```
export const authConfig: AuthConfig = {
  ...
  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'YOUR_CLIENT_ID',
  ...
}
```

Also make sure to change the scope to your own roles (see blog posts).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
