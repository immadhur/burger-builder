const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const auth = async (req, res, next) => {
    try {
        console.log('In middleware');
        if (!req.header('Authorization'))
            throw new Error('Header not present');
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token);
        const userId = jwt.verify(token, process.env.JWT_KEY);
        // console.log(userId);
        const user = await userModel.findOne({ _id: userId.id, 'tokens.token': token });
        req.user = user;
        req.token = token;
        // console.log(user);
        next();
    }
    catch (err) {
        res.status(501).send(failRes('Error in authentication!', err))
    }
}

module.exports = auth;