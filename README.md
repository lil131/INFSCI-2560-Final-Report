# Note
- Nov.22
  - changed page routes, created user model and api

| Route | Note |
| -------- | -------- |
| /     | |
| /login | |
| /chapters| |
| /chapter | |
| /questions | |
| /manager#create| Connected to DB |
| /manager#search|  |

## Development setup
```
npm run install-dev
```
If there is a problem to install node_modules, try to delete package-lock.json, client/package-lock.json, node_modules, client/node_modules folders. Then, execute the command above again.

## Start the local environment
Do not use `npm start` for this project, please use the command below to start your local server.
```
npm run start-dev
```

## Environment configuration
```
MONGODB_URI=***
NODE_ENV=***
PORT=***
```

## References
- An Easy Way to Get Started with the MERN Stack: https://alligator.io/react/mern-stack-intro/
- React-route-dom: https://reacttraining.com/react-router/web/guides/quick-start
- Axios: https://github.com/axios/axios
