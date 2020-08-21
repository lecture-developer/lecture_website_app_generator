import express from 'express';
import cors from 'cors';
import dotnev from 'dotenv';
import indexRouter from './src/routes/indexPage';

dotnev.config();

// // Mongo setup
// const uri = process.env.ATLAS_URI
// mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");
// })

const app = express();
app.use(cors());
app.use(express.json());

// Index page routing
app.use('/index', indexRouter);

// const userRouter = require('./routes/users');
// app.use('/users', userRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
