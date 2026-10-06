# Tzofia-Eye

## Databases

I chose to use MongoDB because there was no requirement for live relationships between tables, and I am more familiar with MongoDB.

## Returned Statuses

I used standard status codes: \
Registration or creation – 201 \
Other success – 200 \
User / Alert / Path not found – 404 \
Username / Email already exists – 409 \
Unauthenticated user – 401 \
Unauthorized user – 403 \
Invalid details – 400 \

## Validations

I used Zod to handle validations within a dedicated middleware. \
In the event of invalid input, the server returns a 400 status code along with the error from Zod.

## State Management

The alerts are stored on the client side within a global context (Zustand), \
 as it is the most convenient to use and ensures that only the components consuming the data are re-rendered.

## Special Notices

In accordance with the instructions I received, \
 I enabled each user to update the alerts they are authorized to view.

## Execution Instructions
Rename the file 'env.example' to '.env'\
and add the required environment variables (port, mongo-URI, and a string for generating and decoding tokens).\
\
To run the server, execute the following in the terminal:

```
cd server; npm start
```

And then To run the client, execute the following in the terminal:

```
cd client; npm run dev
```
