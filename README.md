
![Logo](https://pbs.twimg.com/profile_images/1540324223620620288/xVjZycOa_400x400.jpg)


# Gameo Server

This repository contains the code to host the backend server of Gameo.


## Features

- Registering
- Signing in
- Logging a game (beaten, completed, planning,..)
- Explore games
- View the details of a game
- Suggest games to others
- Create lists of different games (top 100, indie games in 2022,...)


## Installation

Install the gameo server with npm

```bash
  npm install
```

## Run server
To run the server, you need to run a single command

```bash
  npm run dev
```
    
## Environment Variables

To run this server, you will need to add the following environment variables to your .env file

```
DB_HOST=
DB_USER=
DB_NAME=
DB_PASSWORD=
DB_PORT=
TOKEN_SECRET=
REFRESH_SECRET=
DATABASE_URL=
```

## Authors

- [@issamelnasiri](https://github.com/IssamElNass)

