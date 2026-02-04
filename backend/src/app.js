let express = require('express');
let path = require ('path')
let cors = require('cors');
let  notesmodels = require('./models/notesmodels');
let app = express();
app.use(express.json());
app.use (express.static('./public'))
app.use(cors());
app.post('/api/notes/main',async(req,res)=>{
    let {title,content} = req.body;
  let note = await notesmodels.create({
        title,content
    })
    res.status(201).json({
        message:"Note created successfully",
        note
    });



});
app.get('/api/notes/main',async(req,res)=>{
    let notes = await notesmodels.find();
    res.status(200).json({
        message:"All notes fetched successfully",
        notes
    });
}); 
app.delete('/api/notes/main/:id',async(req,res)=>{
    let id = req.params.id;
    await notesmodels.findByIdAndDelete(id);    
    res.status(200).json({
        message:"Note deleted successfully"
    });
}); 
app.patch('/api/notes/main/:id',async(req,res)=> {
let id = req.params.id
let {content} = req.body
await notesmodels.findByIdAndUpdate(id,{content })
res.status(200).json({
    message : "update successfulyy",
    content 
})
})
app.use('*name',(req,res)=> {
    res.sendFile(path.join(__dirname,'..','/public/index.html'))
})
module.exports = app;