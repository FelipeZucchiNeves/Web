//interpreta e deixa dados prontos para serem manipulados
const bodyParser =  require('body-parser')


//executa quando uma requisição chega
const express = require('express')
const app = express()


//prove as aplicações atravez desse método estatico 
app.use(express.static('.'))
// trata submit e transforma em objeto
app.use(bodyParser.urlencoded({extended: true}))
//trata JSON em requisição 
app.use(bodyParser.json())

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './upload')

    },
    filename: function (req, file, callback){
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage}).single('arquivo')

app.post('/upload',(req, res)=>{
    upload(req,res,erro => {
        if(erro){
            return res.end('Ocorreu um erro.')
        }
        res.end('Concluído com sucesso.')
    })
})

app.listen(8080, () => console.log('Executando...'))