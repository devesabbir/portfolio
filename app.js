// Import Externally
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from 'path'
import { fileURLToPath } from "url";


// Import From Internally
import handleError from './middleware/ErrorHandle.js';

// import routes 
import routes from './routes/index.js';

// Configure
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser())
app.use(cors())
 



// Routes 
app.use('/api/v1/', routes)

app.use( handleError )

export default app