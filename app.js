const express = require('express')
const app = express();
const router = express.Router();
app.set('view engine', 'ejs')
const bodyParser = require('body-parser');
const con = require('./connection.js')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },

    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    res.render('auto')
})

app.get('/show', (req, res) => {
    res.render('show')
})
// post api

app.post('/auto', upload.single('file'), (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var file = req.file.filename;
    console.log(file)

    var sql = "INSERT INTO person2 (email,password,file) VALUES (?,?,?)";
    con.query(sql, [email,password,file], function (err, result) {
     if (err) throw err;
    res.redirect('/get')
    });
});

// get data table

app.get("/get", (req, res) => {
        var sql = "SELECT * FROM person2"
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err)
            }
            else {
                // console.log(result)
                res.render("admin/get", { data: result });
            }
        });
});


// router.get('/show/:id',function(req,res){
//     console.log(req.params.id);
    
//     file.findById(req.params.id, function(err, data,result){
    
//         if(err){
//             console.log(err)
//         }else{
//             console.log(data);
    
//             res.render('show', {data:result});
//         }
//     });
//     });
    


app.use('/', router)
app.listen(4200, () => console.log("listen 4200 port"))
module.exports = router;
