const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const SECRET_CODE = "ajsasluweweh";
const {offer} = require("../schemas/offer_schema");
const getUserBYToken = (token)=>{
    return  new Promise((resolve , reject)=>{
        if(token)
        {
            let userData
            try{
                  const userData = jwt.verify(token , SECRET_CODE);
            }catch(err)
            {
                reject("Inavlid Token!")
            }
        }else
        {
            reject("Token not found")
        }
     })
}
router.get("/list" , async(req, res)=>{
   offer.find().then((offers)=>{
    console.log(offers ,"offer list")
   }).catch(()=>{
    res.status(500).send("Internal Server Error")
   })
});
router.post("/create" , async(req, res)=>{
      getUserBYToken(req.headers.authorization).then((user)=>{
        offer.create({...req.body , username:user.username}).then(()=>{
             res.status(200).send(offer.title + " " + "created successfully");
        }).catch((err)=>{
            res.status(400).send({message : err.message })
        })
        // res.send(200).send(user)
      }).catch((err)=>{
        res.status(400).send(err)
      })
})
module.exports = router;