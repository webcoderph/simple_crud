# Simple CRUD

## Project setup

### Install
```
cd server && npm install
cd client && npm install
```

### Database 
- Login to your database and create myblog_development schema

```
cd server && mv .env.bak .env
- Open and add your database username and password inside the .env file
Next
Go to the config folder
cd ./server/src/config
And run
knex migrate:latest

```

### RUN
```
NODE JS
cd server && npm start


VUE JS
cd client && npm run serve
```



