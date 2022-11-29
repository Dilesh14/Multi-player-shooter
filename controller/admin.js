const express = require('express');
const router = express.Router();

//defining the admin 
const admin = {
    user: "admin",
    password: "admin",
    status:false

}
router.get("/admin", function(req,res){
    if(req.session.auth){
        res.render("adminlogged",{
            title:"Unavailable"
        });
    }
    if (admin.status){
        res.render("adminpage",{
            title:"Admin Page"
        });
    }
    res.render("admin",{
        title:"Admin Page"
    });
});


module.exports = router;