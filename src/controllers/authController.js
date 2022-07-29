import userService from './../services/userService'


const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new HttpError("Please fill all field.", 400);
        }

        const newUser = await userService.addUser(req.body)

        res.send(newUser)
    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new HttpError("Please fill all field.", 400);
        }

        const loginuser = await userService.loginUser(username, password, res)
        res.send(loginuser)

    } catch (error) {
        res.status(error.status || 500).send(error.message);
    }
}

module.exports = {
    register,
    login
};

