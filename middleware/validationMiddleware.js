module.exports = (req,res, next) => {
    if(req.files == null || req.body.titre == null || req.body.description == null) {
        return res.redirect('/signalements/new')
    }
    next()
}