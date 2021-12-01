import express from 'express';
import { Client } from 'pg';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {userRouter} from './userRouter';
import {gameRouter} from './gameRouter';
dotenv.config();
export const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});
//variables
process.env.TZ = 'Asia/Shanghai';
client.connect();
//Middleware
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'mastermind',
    resave:true,
    saveUninitialized:true,
}));

app.use('/user',userRouter);
app.use(gameRouter);
app.use(express.static('public'));
app.use(express.static('uploads'));
app.get('/', function (req, res) {
    res.redirect('/home.html');
});

app.listen(8080, () => {
    console.log("Listening http://localhost:8080");
});