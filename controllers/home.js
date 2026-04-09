const Signalement = require('../models/Signalement')
module.exports = async (req, res) => {
    const signalements = await Signalement.find({}).populate('userid');
    console.log(req.session)
    res.render('index', {
        signalements
    });
}