const mongoose = require('mongoose')
const Signalement = require('./models/Signalement')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1/ma_bd',
    { useNewUrlParser: true }
);
Signalement.create({
    titre: 'Vol de nourriture',
    description: "Un homme a l'allure suspecte a ete "+
    "une assiette de hamburgers"
}, (error, signalement) => {
    console.log(error, signalement)
}) 