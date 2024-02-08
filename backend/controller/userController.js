const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // Check if username is already used
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.status(400).json({ msg: "Username already used", status: false });
        }

        // Check if email is already used
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.status(400).json({ msg: "Email already used", status: false });
        }

        // Hash the password
        const passwordHashed = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            username,
            email,
            password: passwordHashed,
        });

        // Remove password from the response
        const userWithoutPassword = { ...user.toObject() };
        delete userWithoutPassword.password;

        return res.json({ status: true, user: userWithoutPassword });
    } catch (err) {
        next(err);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "Incorrect email", status: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Incorrect password", status: false });
        }

        const userWithoutPassword = { ...user.toObject() };
        delete userWithoutPassword.password;

        return res.json({ status: true, user: userWithoutPassword });
    } catch (err) {
        next(err);
    }
};

module.exports.getUser = async (req, res, next) => {
    try{
        const user = await User.find({_id: {$ne: req.params.id}}).select([
            "email",
            "username",
            "password",
            "_id"
        ])
        return res.json(user)
    }
    catch(err){
        next(err)
    }
}