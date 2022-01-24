const passport = require('passport');
const Resume = require('../models/resume');
const User = require('../models/user');

exports.getMainPage = (req, res) => {
    Resume.fetchResume(items => {
        res.render('index.ejs', { myResume: items });
    });
}
exports.getLoginPage = (req, res) => {
    res.render('login');
}
exports.getRegisterPage = (req, res) => {
    res.render('register');
}
exports.getAdminPage = (req, res) => {
    if (req.isAuthenticated()) {
        Resume.fetchResume(items => {
            res.render('admin.ejs', { myResume: items });
        });
    } else {
        res.redirect('/login');
    }


}
exports.postRegister = (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (error, user) => {
        if (error) {
            console.log(error);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/admin');
            });
        }
    });
}

exports.postLogin = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, (error) => {
        if (error) {
            console.log(error);
            res.redirect('/login');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/admin');
            });

        }
    })
}
exports.updateResume = (req, res) => {

    function checkForFile() {
        return new Promise((resolve, reject) => {
            let imageName = '';
            Resume.fetchResume(items => {
                imageName = items[0].image;
                if (typeof req.file === 'undefined') {
                    resolve(imageName);
                } else {
                    var fs = require('fs');
                    let filePath = `./images/${imageName}`;
                    fs.unlinkSync(filePath);
                    resolve(req.file.filename);
                }
            });
        })
    }

    updateResume();
    async function updateResume() {
        const imageName = await checkForFile();
        const updatedResume = new Resume(req.body.fullName, req.body.dateOfBirth, req.body.residence, req.body.occupation, req.body.introduction, imageName,
            req.body.phoneNumber, req.body.email, req.body.facebook, req.body.twitter, req.body.instagram, req.body.school1, req.body.graduationDate1,
            req.body.school2, req.body.graduationDate2, req.body.school3, req.body.graduationDate3, req.body.technicalSkills, req.body.softSkills);
        updatedResume.saveResume();
    }

    res.redirect('/');
};

exports.getLogout = (req, res) => {
    req.logout();
    res.redirect('/');
}