


const register = (req, res) => {
    console.log(req);
    return res.status(201).json({message: "User created!"});
}

module.exports = { register };