var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')

var app = express()

app.get('/profile/:id', function(req, res) {
    var myObj = [{'name': '李懿哲'}, {'age': 28}]
    res.status(200).send('you requested a profile with id:' + req.params.id)
})

app.get('/ab?cd', function(req, res) {
    res.send('/ab?cd')
})

app.get('/', function(req, res) {
    res.send(req.query.weather)
})

// post

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/login', urlencodedParser, function(req, res) {
    if (!req.body) return res.sendStatus(400)
    res.send('welcome, ' + req.body.username)
})

app.post('/api/user', jsonParser, function(req, res) {
    console.log(req.body)
    res.send('age: ' + req.body.age)
})

/** 文件上传 */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
  })
  

var upload = multer({storage: storage })
// 表单
app.get('/form', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/upload', upload.single('logo'), function(req, res) {
    console.log(req.file)
    res.send('ok')
})

/** 模版 */

app.set('view engine', 'ejs');

app.get('/ejs/:name', function(req, res) {
    var name = req.params.name
    res.render('form', {people: name});
});

app.listen(3000)
console.log('server start linsen port 3000')