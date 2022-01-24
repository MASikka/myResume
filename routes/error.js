const express = require('express');
const myRouter = express.Router();

myRouter.get('*', (req, res) => {
    res.send('404. Page not found.');
});


module.exports = myRouter;