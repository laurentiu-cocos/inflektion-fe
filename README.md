# Frontend Project

This is a frontend project built with Angular. It includes features such as notifications, a dashboard, and a table with pagination.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Services](#services)
- [Dependencies](#dependencies)

## Installation

To install the project dependencies, run:

```bash
npm install
```

## Usage

To start the project, run:

```bash
ng serve
```

or

```bash
npm run start
```

## Components

### AppComponent

The main component of the project. It includes the navigation bar and the router outlet.

### NotificationComponent

Displays notifications using Bootstrap alerts. Notifications are dismissible and stick to the bottom of the left screen.

### DashboardComponent

Displays the dashboard with date range selection and options to choose columns, message partners, and export the list.

## Services

### NotificationService

Manages notifications and provides methods to show notifications of different types (success, error, info, warning).

### ColumnVisibilityService

Manages the visibility of columns in the table. It provides methods to get and set the visibility of columns.

## Dependencies

- @angular/common: ^19.2.0
- @angular/compiler: ^19.2.0
- @angular/core: ^19.2.0
- @angular/forms: ^19.2.0
- @angular/platform-browser: ^19.2.0
- @angular/platform-browser-dynamic: ^19.2.0
- @angular/router: ^19.2.0
- @fortawesome/fontawesome-free: ^6.7.2
- bootstrap: ^5.3.3
- bootstrap-icons: ^1.11.3
- rxjs: ~7.8.0
- tslib: ^2.3.0
- zone.js: ~0.15.0

## Dev dependencies

- @angular-devkit/build-angular: ^19.2.3
- @angular/cli: ^19.2.3
- @angular/compiler-cli: ^19.2.0
- @types/jasmine: ~5.1.0
- jasmine-core: ~5.6.0
- karma: ~6.4.0
- karma-chrome-launcher: ~3.2.0
- karma-coverage: ~2.2.0
- karma-jasmine: ~5.1.0
- karma-jasmine-html-reporter: ~2.1.0
- typescript: ~5.7.2
