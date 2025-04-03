const express = require("express");
const router = express.Router();

// middlewares

const auth = function (req, res, next) {
    console.log("Runing on auth middleware")
    req.user = {userUId: 1, role: "student"}
    // req.user = { userUId: 2, role: "admin" };

    if(req.user){
        next()
    }
    else{
        res.json({
            success: false,
            message: "Not a Valid User",
        })
    }
};


const isStudent = function (req, res, next) {
	console.log("Runing on student middleware");

	if (req.user.role === "student") {
		next();
	} else {
		res.json({
			success: false,
			message: "Access Denied, these route is only for students",
		});
	}
};


const isAdmin = function (req, res, next) {
	console.log("Runing on Admin middleware");

	if (req.user.role === "admin") {
		next();
	} else {
		res.json({
			success: false,
			message: "Access Denied, these route is only for admins",
		});
	}
};


// routes

router.get("/student", auth, isStudent, (req, res) => {
    console.log("Runing in student page")
    res.send("Student's page")
})


router.get("/admin", auth, isAdmin, (req, res) => {
	console.log("Runing in admin page");
	res.send("Admin's page");
});

module.exports = router;
