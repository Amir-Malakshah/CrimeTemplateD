module.exports = (req, res) => {
    if(req.session.userId){
        return res.render("createform");
    }
    res.redirect("/users/login");
};