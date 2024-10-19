require("dotenv").config();
import express from 'express';
import configViewEngine from './config/viewEnginre';
import configCors from './config/configCors';
import cookieParser from "cookie-parser";
import { routes } from './routes/routes';
import cors from "cors";

const app = express();

configViewEngine(app);

const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//     next();
// });

app.use(express.static('src/assets'));
app.use(cookieParser());


routes(app);

// loginGoogle();

app.use((req, res) => {
    return res.send("404 not found");
})

app.listen(PORT, () => {
    console.log("Backend is running on port " + PORT);
});