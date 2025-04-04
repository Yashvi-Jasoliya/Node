const express = require('express')
const router = express.Router()


const User = require("../models/userModel")


// View or Read opn

router.get("/users", async(req, res) => {
    console.log("GET request Received...");
    try{
        const users = await User.find();
        res.status(200).json(users)

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


// Create :- we have data and insert into mongodb

router.post("/users", async(req,res) => {

    console.log("POST request Received...")
    try {
        const{name, age, ph} = req.body;
        const newUser = new User({name, age, ph})
        await newUser.save();
        res.status(200).json({
            success: true,
            user: newUser
        })

	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
})


// Update

router.put("/users/:id", async(req, res) => {
    console.log("PUT request Received...");
    const {id} = req.params;
    const {name, age, ph} = req.body;
    try{
        const updateUser = await User.findByIdAndUpdate(id, {name, age, ph})
        if(!updateUser){
            res.json({
                message: "User not found!"
            })
        } 

        res.status(200).json({
            success: true,
            user: updateUser
        })
    }
    catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
    }
})

// Delete

router.delete("/users/:id", async (req, res) => {
	console.log("DELETE request Received...");
	const { id } = req.params;
	const { name, age, ph } = req.body;
	try {
		const deletedUser = await User.findByIdAndDelete(id, { name, age, ph });
		if (!deletedUser) {
			res.json({
				message: "User not found!",
			});
		}

		res.status(200).json({
			success: true,
			user: deletedUser,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});


module.exports = router;