const { Schema, model } = require("mongoose");
const { type } = require("os");

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		maxlength: 50,
	},
	age: {
		type: Number,
		required: true,
	},
    ph: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

// used schema and create model
const UserModel = model("User", UserSchema);

module.exports = UserModel;