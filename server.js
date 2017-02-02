/**
 * Created by user on 28.01.2017.
 */
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';

import config from './config';

//routs
import authRoute from './routs/Auth';

//middleware
import errorHandler from './middleware/errorHandler';
import checkToken from './middleware/checkToken';

const app = express();

mongoose.Promise = bluebird;
mongoose.connect(config.database, err => {
    if(err){
        throw  err;
    }

    console.log("Mongo connect!");
});

app.listen( config.port , err => {
    if(err) throw err;

    console.log(`Server is run in port: ${config.port}`);
});

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret
}));


app.use('/api',authRoute);
app.get('/test',checkToken,(req,res)=>{
    res.json('test');
});

app.use(errorHandler);