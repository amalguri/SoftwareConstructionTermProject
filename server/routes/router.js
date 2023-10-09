const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");


// register userdata

router.post("/register", async(req,res) => {
    const {title,artist,genre,language,composedby,duration,description} = req.body;

    if(!title || !artist || !genre || !language || !composedby || !duration || !description){
        res.status(422).json("please fill all the fields")
    }

    try{
        const preuser = await users.findOne({title:title});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this song is already present");
        }else{
            const adduser = new users({
                title,artist,genre,language,composedby,duration,description
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }
    }catch(error){
        res.status(422).json(error);
    }
})

// get userdata

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})

// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})

// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;