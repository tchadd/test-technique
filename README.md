# Test-technique

## WARNING
this project is only intended to work in dev mode, as it's a technical test.

You can see that there is a package.json in root, it's only for ide's typings.

If you want to experiment view transitions, please use chromium browser, as firefox and safari don't actually supports it. view transitions will just not work on other browsers.

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

VOS DONNEES 
```bash

{ "_id" : 1, "name" : "AC1 Phone1", "type" : "phone", "price" : 200.05, "rating" : 3.8,"warranty_years" : 1, "available" : true },
{ "_id" : 2, "name" : "AC2 Phone2", "type" : "phone", "price" : 147.21, "rating" : 1,"warranty_years" : 3, "available" : false },
{ "_id" : 3, "name" : "AC3 Phone3", "type" : "phone", "price" : 150, "rating" : 2,"warranty_years" : 1, "available" : true },
{ "_id" : 4, "name" : "AC4 Phone4", "type" : "phone", "price" : 50.20, "rating" : 3,"warranty_years" : 2, "available" : true }
```
