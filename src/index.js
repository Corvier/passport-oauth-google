// En este archivo se configura el servidor de express
import express from 'express';
import { loginRouter } from '../routes/login.js';
import passport from 'passport';
import session from 'express-session';
import "../middlewares/google.js";

const app = express();
const port = 3000;

app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(express.json());
app.use(passport.initialize());

app.use("/auth", passport.authenticate("auth-google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ]
    }), loginRouter
);
 
app.listen(port, () => console.log(`Example app listening on port ${port}!`));