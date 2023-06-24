const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, require: true},
    loggedIn: {type: Boolean, default: false},
    Cart: [{type: mongoose.Schema.Types.ObjectId, ref: "Cart"}]
})

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id}, "cloud-scale")
    return token
}

const User = mongoose.model("User", userSchema)

module.exports = User