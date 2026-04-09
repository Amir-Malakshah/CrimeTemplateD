module.exports = (req, res) => {
    var username = ""
    var password = ""
    const donnees = req.flash('donnees')[0];
        if(typeof donnees != "undefined"){
            username = donnees.username
            password = donnees.password
        }
    


    res.render("registerform", {
        erreurs: req.flash('erreurs'),
        username: username,
        password: password
    });
};