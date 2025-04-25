const User=require("../models/user");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup = async (req,res)=>{
    try{
        let {email,username,password}=req.body;
        let newUser=new User({email,username});
        const registerestUser=await User.register(newUser,password);
        console.log(registerestUser);
        req.login(registerestUser,function(err){
            if(err)
            {
                return next(err);
            }
            req.flash("success","welcome to wanderlust");
            res.redirect("/listings");
        })
    }catch(e)
    {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = (req,res)=>{
    req.flash("success","welcome back");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    delete req.session.redirectUrl; // Clear the redirect URL after using it
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success","goodbye");
        res.redirect("/listings");
      });
};