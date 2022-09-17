import express from 'express'
import passport from 'passport'
const router = express.Router()

import User from '../server/database/schema/user.js'

/*================
	Root ROUTE
=================*/

router.post("/register", function (req, res) {
	const newUser = new User({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email });
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			return res.status(400).redirect("/register");
		}

      passport.authenticate("local")(req, res, function () {
			res.status(200)
		});
      const authenticate = User.authenticate();
      authenticate(req.body.email, req.body.password, function(err, result) {
         if (err) { 
            console.log(err);
			   return res.status(400).redirect("/register");
         }
         res.status(200).redirect("/");
      });
	});
});

router.post("/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
	}),
	function (req, res) {}
);

router.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/")
});

module.exports = router;