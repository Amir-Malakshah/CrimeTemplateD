const express = require('express')
const path = require('path')
const app = new express()
const ejs = require('ejs')
const newSignalementController = require('./controllers/newSignalement.js')
const homeController = require('./controllers/home.js')
const getSignalementController = require('./controllers/getSignalement.js')
const storeSignalementController = require('./controllers/storeSignalement.js')
const validerMiddleWare = require("./middleware/validationMiddleware.js");
const newUserController = require('./controllers/newUser.js')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login.js')
const loginUserController = require('./controllers/loginUser.js')
const connectflash =require('connect-flash');
const logoutController = require('./controllers/logout.js')
const userMiddleware = require("./middleware/userMiddleware.js");
const validuserMiddleware = require("./middleware/validuserMiddleware.js");
const expressSession = require('express-session');
const fileUpload = require('express-fileupload')
app.use(fileUpload())
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(connectflash());
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
const Signalement = require('./models/Signalement.js')
const mongoose = require('mongoose');
const { error } = require('console')
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', false);
mongoose.connect(
    // 'mongodb://127.0.0.1/ma_bd',
    "mongodb+srv://malekshahamirbahador:Canada991349%2A@cluster0.eh28y.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log("MongoDB connecté ✅"))
.catch(err => console.error("Erreur MongoDB ❌", err));



app.use(
    expressSession({
        secret: "green arrow",
        resave: true,
        saveUninitialized: true
    })
);

app.post('/users/checklogin',validuserMiddleware,loginUserController)

app.get('/users/login', validuserMiddleware,loginController);

app.post('/users/register',validuserMiddleware,storeUserController)

app.use('/signalements/store', validerMiddleWare)
global.loggedIn = null;
app.use("*", (req,res, next) => {
    loggedIn = req.session.userId;
    next();
});

app.get('/users/logout',logoutController)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/users/new', validuserMiddleware,newUserController)

app.get('/', homeController)
    




app.get('/post/:id', getSignalementController)
   


app.get('/signalements/new',userMiddleware, newSignalementController)
   

app.post('/signalements/store', storeSignalementController)
   

    
    
    


app.get('/find', async (req, res) => {
    const signalements = await Signalement.find({
        titre: { $regex: req.query.search , $options:'i'}
    })
    res.render('index', {
        signalements
    });
})
app.use((req,res) => res.render('error404'));