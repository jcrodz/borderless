var express = require('express');
const bcrypt   = require("bcrypt");
const Company = require('../models/company');
const User     = require("../models/user");
const passport = require("../helpers/passport");
const Picture = require('../models/pictures');
const bcryptSalt = 10;
var auth    = require('../helpers/auth');
const flash          = require("connect-flash");

var router = express.Router();
var multer  = require('multer');




//get home page
router.get('/', (req, res, next) => {
    res.render('index');
  })



/* GET explore page. */
router.route('/explore')
  .get((req, res, next) => {
    let city = req.query.city;
    Company.find({},{_id: 0, userid: 0} ,(err, companies)=>{  //if _id: 0, the data excludes all _id values, if _id: 1, then it exclusively returns only _ids
      if (err){
        res.render('explore');
      } else {
        res.render('explore', {companies , city});
         //passes to script on explore.ejs page
      }
    })
  });


/* GET users listing. */
router.get('/signup', function(req, res, next) {
  let role = req.query.role;
  res.render('auth/signup', { "message": req.flash("error"), role });
});

router.post("/signup", (req, res, next) => {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var nationality = req.body.nationality;
  var role = req.body.usertype;
  var companyid = null;

  if (username === "" || password === "") {
  	req.flash('error', 'Indicate username and password' );
    res.render("auth/signup", { "message": req.flash("error") });
    return;
  }

  User.findOne({ username }, "name", (err, user) => {
    if (user !== null) {
    	req.flash('error', 'The username already exists' );
      res.render("auth/signup", { message: req.flash("error") });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      name,
      username,
      password: hashPass,
      nationality,
      role,
      companyid
    });

    newUser.save((err) => {
      if (err) {
      	req.flash('error', 'The username already exists' );
        res.render("auth/signup", { message: req.flash('error') });
      } else {
        passport.authenticate("local")(req, res, function () {
           res.redirect('/login');
        });
      }
    });
  });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});


router.post("/login", passport.authenticate("local", {
  successRedirect: "/users/index/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));


router.get('/users/index/', auth.checkLoggedIn('You must be logged in', '/login'), (req, res, next) => {
  if(req.user.role === "USER") {
      res.render('users/index', { user: req.user});
  } else if (req.user.role === "COMPANY") {
      res.render('companies/index', { user: req.user});
  } else {
      res.render('admin/index', { user: req.user });
    }
});


router.get('/company/new', auth.checkLoggedIn('You must be logged in', '/login'), auth.checkCredentials('COMPANY'), (req, res, next) => {
  res.render('companies/new', { user: req.user });
});

router.post('/company/new', auth.checkLoggedIn('You must be logged in', '/login'), auth.checkCredentials('COMPANY'), (req, res, next) => { //places the companies onto the map and for use on right-side bar
    var currentUser = req.session.passport.user._id;
    let location = [Number(req.body.longitude), Number(req.body.latitude)];

     const newCompany = {
      name:           req.body.name,
      type:           req.body.type,
      city:           req.body.city,
      description:    req.body.description,
      webdeveloper:   req.body.webdeveloper,
      mobiledeveloper: req.body.mobiledeveloper,
      uxdeveloper:    req.body.uxdeveloper,
      coordinates:    location,
      icon:           req.body.icon,
      website:        req.body.website,
      details:        req.body.details,
      userid:         currentUser,
    };

  	const company = new Company(newCompany);

  	company.save((error, company) => {
      if (error) {
  			next(error);
  		} else {
        console.log("testetst", company);
        User.findByIdAndUpdate({_id: currentUser}, {companyid: company._id}, (err, user) => {
          if (err) {
            next(err);
          } else {
            User
            .findOne({_id: currentUser})
            .exec((err, user)=>{
              if(err){
                next(err)
                return
              }
              console.log("after creating", user);
                res.render('companies/index', {user: user});
            })

          }
        })
  		}
  	})
  });

router.get('/company/:id/edit', auth.checkLoggedIn('You must be logged in', '/login'), auth.checkCredentials('COMPANY'), (req, res, next) => {
  console.log(req.params.id);
    console.log(req.query.id);
  Company.findById({_id: req.params.id}, (err, company) => {
	  	if (err) {
	  		next(err);
          } else {
            console.log('dentro de company edit router', company);
        res.render('companies/update', {company});
          }}
  )
});

router.post('/company/:id/edit', (req, res, next) => {
		Company.findById({_id: req.params.id}, (err, company) => {
      var currentUser = req.session.passport.user._id;
      let location = [Number(req.body.longitude), Number(req.body.latitude)];
      if (err) {
				next(err);
			} else {
				company.name =            req.body.name,
        company.type =            req.body.type,
        company.city =            req.body.city,
        company.description =     req.body.description,
        company.webdeveloper =    req.body.webdeveloper,
        company.mobiledeveloper = req.body.mobiledeveloper,
        company.uxdeveloper =     req.body.uxdeveloper,
        company.coordinates =     location,
        company.icon =            req.body.icon,
        company.website =         req.body.website,
        company.details =         req.body.details,
        company.userid =          currentUser,
				company.save((err) => {
		  		if (err) {
		  			next(err);
		  		} else {
            
		  			res.redirect('/users/index');
		  		}
		  	})
			}
		})
	});

router.route('/company/:id/delete')
	.get((req, res, next) => {
		Company.remove({ _id: req.user.companyid }, function(err, company) {
	    if (err) {
	    	next(err)
	    } else {
        req.user.companyid = null;
	    	res.redirect('/users/index');
	    }
    });
	});

router.get('/:id/edit', auth.checkLoggedIn('You must be logged in', '/login'), (req, res, next) => {
  User.findById({_id: req.user._id}, (err, user) => {
	  	if (err) {
	  		next(err);
          } else {
        res.render('auth/update', {user});
          }}
  )
});

router.post('/:id/edit', (req, res, next) => {
  console.log('dentro de post en routes', req.body);
    let password = req.body.password;
    let salt     = bcrypt.genSaltSync(bcryptSalt);
    let hashPass = bcrypt.hashSync(password, salt);
		User.findById({_id: req.user._id}, (err, user) => {
      var currentUser = req.session.passport.user._id;
      if (err) {
				next(err);
			} else {
        user.name =               req.body.name,
        user.password =           hashPass,
        user.nationality =        req.body.nationality,
				user.save((err) => {
		  		if (err) {
		  			next(err);
		  		} else {
		  			res.redirect('/users/index');
		  		}
		  	})
			}
		})
	});

router.route('/:id/delete')
	.get((req, res, next) => {
		User.remove({ _id: req.user._id }, function(err, user) {
	    if (err) {
	    	next(err)
	    } else {
	    	res.redirect('/');
	    }
    });
	});

router.get("/logout", (req, res) => {
  req.logout();
  delete res.locals.currentUser;
  delete req.session.passport;
  // delete currentUser and passport properties
  // becasuse when we calling req.logout() is leaving an empty object inside both properties.
  res.redirect('/');
});


// Route to upload photos from project base path
var upload = multer({ dest: './public/uploads/' , limits: {fileSize: 5000000, files:1}, });

router.post('/upload', upload.single('photo'), function(req, res){

  pic = new Picture({
    name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/users');
  });
});





module.exports = router;
