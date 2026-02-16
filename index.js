//import modules
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')

dotenv.config()


//database
const db_users=[]

const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.use(morgan('combined'))
app.use(cors())

//GET ALL USRES
app.get('/api/users',(req,res)=>{
    res.json(db_users)
})

//CREATE USER
app.post('/api/user',(req,res)=>{
    const {username, email, photo, password} = req.body
    const user = {id:db_users.length,username,email,photo,password}
    db_users.push(user)
    res.json(user)
})
//GET ONE USER
app.get('/api/user/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const user = db_users.find(u => u.id === id)
    res.json(user)
})
//UPDATE USER
app.put('/api/user/:id',(req, res)=>{
    
    const id = parseInt(req.params.id)
    // methode 01
    // const {username, photo, email, password} = req.body
    //  const dbUser = db_users.find(u => u.id === id)
    // dbUser.username = username
    // dbUser.photo = photo
    // dbUser.email = email
    // dbUser.password = password
    
    // methode 02
    db_users[id] = {id, ...req.body}
    const dbUser = db_users.find(u => u.id === id)
    
    res.json(dbUser)
})
//DELETE USER
app.delete('/api/user/:id',(req,res)=>{
    const id  = parseInt(req.params.id)
    const deletedUser = db_users[id]
    db_users.splice(id, 1)
    res.json({message : "user deleted ssucessfully",data: deletedUser})
})








app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT} http://localhost:${PORT}`);
})