const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const {open} = require('sqlite');
const sqlite3 = require('sqlite3');

const app = express();
app.use(express.json());
app.use(cors(
    {origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
    }
));
app.use(cookieParser());

dotenv.config();

const dbPath = path.join(__dirname, "auth.db");
let db = null;

const port = process.env.PORT || 5000;

const initiallizeDbAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver:sqlite3.Database
        })
        app.listen(port, () => {
            console.log(`Server Running at ${port}`);
        })
    } catch (error) {
        console.log(`DB Error: ${error.message}`);
        process.exit(1);
    }
}
initiallizeDbAndServer();


app.post("/register", async (req,res) => {
    const {email, password} = req.body;

    const exstingUser = await db.get(`SELECT * FROM users WHERE email = '${email}';`);

    if (exstingUser) {
        res.status(400).json({message:"User already exists"});
    }else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUserQuery = await db.run(`INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}')`);
        const userId = createUserQuery.lastID;
        res.status(201).json({message:"User created successfully", userId: userId});
    }
})


app.post("/login", async (req,res) => {
    const {email, password} = req.body;

    const user = await db.get(`SELECT * FROM users WHERE email = '${email}';`);

    if (!user) {
        res.status(400).json({message:"Invalid user please register"});
    } else{
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(isPasswordMatched){
            const payload = {email: email};
            const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
            res.cookie("token", jwtToken, {httpOnly: true});
            res.status(200).json({message: "Login success!"});
        }else{
            res.status(400).json({message: "Invalid password"});
        }
    }
})

app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({message: "Logout success!"});
});

const authenticationToken = (req, res, next) => {
    const jwtToken = req.cookies.token;

    if(!jwtToken){
        res.status(401).json({message: "Invalid JWT Token"});
    }
    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid JWT Token"});
    }
};

app.get("/welcome", authenticationToken, (req, res) => {
    res.status(200).json({message: "Welcome"});
})


module.exports = app;