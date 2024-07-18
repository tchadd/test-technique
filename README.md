# Test-technique

## WARNING
this project is only intended to work in dev mode, as it's a technical test.

You can see that there is a package.json in root, it's only for ide's typings.

## SETUP

### ENVIRONMENT
both front and api provides .env.example, please copy them to ./.env and fill variables.
Note that MongoDB api needs a user: (collection "users": {_id: number, email: string, password: string})
Note that this project will alter the "products" collection too

Launch api and websocket:
```bash
  cd api
  npm ci
  nodemon server.ts or ts-node server.ts
```

launch the client
```bash
  cd front
  npm ci
  npm start or npm run dev
```