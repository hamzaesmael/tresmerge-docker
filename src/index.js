const express = require('express');
//#endregionconst mongoose = require('mongoose');
const redis = require('redis');
const {client} =require('pg');

const PORT = process.env.PORT || 3000;
const app = express();

const REDIS_PORT= 6379;
const REDIS_HOST= 'redis';

const redisclient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisclient.on('error', (err) => console.log('Redis Client Error', err));
redisclient.on('connect', () => console.log('connect to redis'));
redisclient.connect();


const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 5432;
const DB_HOST= 'postgres';

const URI =`postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const client = new client({
  connectionString: URI,
});
client
  .connect()  
  .then(() => console.log('connect to postgres db')) 
  .catch((err) => console.log('ffialed connect to  postgres db',err));


app.get('/', (req,res) => {
  redisclient.set('products', 'products...');
  res.send('<h1>hamza loves sara </h1>');
});

app.get('/data', async (req,res) => {
  const products = await redisclient.get('متاكلش مال الناس');
  res.send(`<h1>hamza loves sara </h1> <h2> متاكلش مال الناس </h2>`);
});

app.listen(PORT, () => console.log(`up is running on port: ${PORT}`));