# Calories Tracker - API

Calories tracker is web app created to calculate calories you are eating through the day. App calculate calories based on products information that user provide. Each user can keep his own list of product that he use on everyday basis.

This project provides API endpoint to front-end application from [this repository](https://github.com/musialpatryk/calories-tracker-front).

## Technologies

- Node.js,
- Express.js,
- JSON Web Tokens,
- MongoDB and Mongoose.

## How to start project locally?

### Requirements

To start this project locally you need to have:

- node.js with NPM,
- mongoDB.

### Run project

1. Clone repository.
1. Open project folder.
1. Provide secret token in .env file. For example:

```
ACCESS_TOKEN_SECRET=sanjd18b1iew178dsgabaADSA^@^!bhsadui721r1bsbu7sa87as8dy7as8dahduhu
```

4. Install project dependencies using:

```
npm install
```

5. Start API using:

```
npm run start
```

### How to change default port?

To change default port provide "PORT" variable in .env file, by default it's "3000".

### How to change default database string?

To change database string provide "DATABASE" variable in .env file, by default it's "mongodb://127.0.0.1:27017".
