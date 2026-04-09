const Signalement = require('../models/Signalement.js')
module.exports = async (req, res) => {
    const signalement = await Signalement.findById(req.params.id).populate('userid');
    console.log(signalement)
    res.render('post', {
        signalement
    });
}