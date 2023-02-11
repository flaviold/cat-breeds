# **Cat Breed App**
---
> ## How to run
  * **Backend:**
    - docker:
      - run `docker-compose up -d`
    - npm:
      - ensure that a redis server is running
      - `cd backend`
      - `npm install`
      - `npm run serve`
  * **Frontend:**
    - `cd frontend`
    - `npm install`
    - `npm run dev`

> ## Implementation details
### Backend:
The backend was developed using TypeScript as a language, Express to handle HTTP requests, and Jest to perform unit tests.
The app is divided into layers, and the main interactions between layers were made using dependency injection.

#### Endpoints:
- `/breed` - return a list of breeds
  - Query parameters:
    - limit: Limits the number of breeds in the list;
    - name: Filters the result to match partial names, for example, `Balisene` and `Banbino` will be matched by the query name `ba`;
    - randomize: Randomizes the result list.
- `/breed/:id` - Return a breed identified by its id.

#### Main layers:
- **controllers**: Responsible for receiving the requests and calling the service to handle it;
- **core**: Contains all the models, interfaces, and services needed to implement all use cases of the application;
- **helper**: Contains any external library helper implementation;
- **main**: The layer responsible for injecting all dependencies and creating the controllers;
- **repositories**: Home of the implementation of any data provider for the application.

#### Containerization:
The application was containerized to help test locally with a "production" environment and to facilitate deployment.
- **Dockerfile**: Created to install the environment;
- **docker-compose.yml**: Responsible for creating, linking, and running all necessary containers to run the application.

#### Deployment:
- The application is hosted on a VPS of DigitalOcean, running Nginx to serve the container on the correct ports (80/443);
- Every time a new commit is pushed to the remote main branch, a GitHub Action is triggered, accesses the VPS, pulls the new code, builds the container, and runs it.

### Frontend:
The frontend was developed in React, using TypeScript, and Material UI to enhance the User Interface.

#### Main layers:
- **components**: All reusable components used throughout the app;
- **layouts**: All layout components;
- **models**: Models required for the app;
- **pages**: Components used for routing.

#### Deployment:
- The application is hosted on Netlify;
- Netlify listens for any changes in the frontend directory in the main branch;
- When changes are made, deployment starts automatically.