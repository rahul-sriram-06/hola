const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app= express()
const port= 3000

app.set('view engine','pug')
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',function(req,res){
//  res.sendFile('index.html',{ root: __dirname})
  res.render('index');
})

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sampledb'
});

connection.connect(function(err){
  if(err) throw err;
  console.log('Connected!');
})



app.post('/',function(req,res){
  var sql = "insert into `articletable`(authorname,genre,content) values('"+req.body.authname+"','"+req.body.genre+"','"+req.body.content+"')"
  connection.query(sql,function(err){
    if(err) throw err
    res.render('index', {title:'Data saved',
    message:'Data saved successfully'
    })
  })

})


app.listen(port,()=> console.log(`Example app listening on port ${port}` ))
