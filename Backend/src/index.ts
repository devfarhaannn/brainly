import express, { json } from "express"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { ContentModel, LinkModel, UserModel } from "./db";
import cors from 'cors'
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import dotenv from 'dotenv'
dotenv.config();

const JWT_PASSWORD = process.env.JWT_PASSWORD as string

const app = express()
app.use(cors());
app.use(express.json())

app.post("/api/v1/signup", async (req, res) => {
    //Zod validation // hashed pass
    const username = req.body.username
    const password = req.body.password

    try {
        await UserModel.create({
            username: username,
            password: password
        })
        res.json({
            message: " User signed up"
        })
    }
    catch (e) {
        res.status(411).json({
            message: "User already exist"
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const UserExisting = await UserModel.findOne({
        username,
        password
    })

    if (UserExisting) {
        const token = jwt.sign({
            //@ts-ignore //TODO FIX IT
            id: UserExisting._id
        }, JWT_PASSWORD)

        res.json({
            token
        })

    } else (
        res.status(403).json({
            message: "Invalid Credentials"
        })
    )
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link
    const type = req.body.type
    // const title = req.body.title

    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })
    res.json({
        meassage: "content created"
    })
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId
    const content = await ContentModel.find({
        userId
    }).populate("userId", "username")
    res.json({
        content
    })
})
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId
    ContentModel.deleteMany({
        contentId,
        //@ts-ignore,
        userId: req.userId
    })

    res.json({
        message: "deleted"
    })
})
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share


    if (share) {
        const ExistingLink = await LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        })

        if (ExistingLink) {
            res.json({
                hash: ExistingLink.hash
            })
             return
        }
        const hash = random(10)
        await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })
        res.json({
            hash
        })
    } else {
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })
        res.json({
            message: "Removed Link"
        })
    }


})
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink

    const link = await LinkModel.findOne({
        hash
    })
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return
    }
    const content = await ContentModel.findOne({
        userId: link.userId
    })
    const user = await UserModel.findOne({
        _id: link.userId

    })
    if (!user) {
        res.status(411).json({
            message: "user not found"
        })
    }
    res.json({
        //@ts-ignore
        username: user.username,
        content: content
    })
})



app.listen(3000)