import express from "express"
import devBundle from "./devBundle"
import path from "path"
import template from "../template"
import { MongoClient } from "mongodb"

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'
const CURRENT_WORKING_DIR = process.cwd()
const app = express()

MongoClient.connect(url, (err, db) => {
    console.log("Connected successful to mongodb server")
    db.close()
})

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
devBundle.compile(app)

app.get("/", (req, res) => {
    res.status(200).send(template())
})



let port = process.env.PORT || 3000
app.listen(port, function onStart(error) {
    if (error) {
        console.log("err")
    } else {
        console.info("Server started on port: %s", port)
    }
})



