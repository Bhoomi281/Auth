const express = require("express");
const router= express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;
const SECRET_KEY = "kdsjnjkdslfsdjlsd"
 const {user} = require("../schemas/user_schema");
const req = require("express/lib/request");
const getUserByToken = (authorization)=> {
    return new Promise((resolve, reject)=> {
        if(authorization) {
            let decoded;
            try {
                decoded = jwt.verify(authorization, SECRET_KEY);
            } catch (err) {
                reject("Token not valid")
            }
            user.findOne({_id: decoded.id}).then((user)=> {
                resolve(user)
            }).catch((err)=> {
                reject("Token error")
            })
        }
    });
}
router.post("/signup", async(req, res)=> {
    bcrypt.genSalt(salt, (saltErr, saltValue)=> {
        if(saltErr) {
            return saltErr
        } else {
            bcrypt.hash(req.body.password, saltValue, (hashErr, hashValue)=> {
                user.create({username: req.body.username, password: hashValue}).then((user)=> {
                    res.status(200).send(user + "added successfully");
                }).catch((err)=> {
                    res.status(400).send(err.message)
                })
            })
        }
    })
});
router.post("/sign", async(req, res)=> {
    user.findOne({username: req.body.username}).then((user)=> {
        console.log(user, "user", req.body.username)
        if(!user) {
            
        } else {
            if(!bcrypt.compareSync(req.body.password, user.password)) {

            } else {
                const token = jwt.sign({id: user._id, username: user.username}, SECRET_KEY);
                res.status(200).send({token: token});
            }
        }
    })
});
router.get("/test", (req, res)=> {
    getUserByToken(req.headers.authorization).then((user)=> {
        res.send(user);
    })
})
module.exports = router;
