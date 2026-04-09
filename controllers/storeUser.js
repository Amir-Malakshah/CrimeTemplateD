const User = require('../models/User.js')
const path = require('path')
module.exports = (req,res) => {
    User.create(req.body, (error,user) => {
        if(error){
            const erreurs=Object.keys(error.errors).map(key =>
                error.errors[key].message
            )

            //req.session.erreurs= erreurs
            req.flash('erreurs',erreurs)
            req.flash('donnees',req.body)
            return res.redirect('/users/new')
        }
        res.redirect('/')
    })
}