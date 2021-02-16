//Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require("./routes/admin")
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session');
const flash = require('connect-flash')
require('./models/Postagem')
const Postagem = mongoose.model('postagens')
require('./models/Categoria')
const Categoria = mongoose.model('categorias')
const usuarios = require('./routes/usuario')

//Configurações
    //Sessão
        app.use(session({
            secret: 'mag000',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())

    //Middleware
        app.use((req,res, next) => {
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            next()
        })

    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars');

    //Mongoose
        mongoose.Promisse = global.Promise
        mongoose.connect("mongodb://localhost/blog_appp", {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }).then(() => {
            console.log("Conectado ao mongodb.")
        }).catch((err) => {
            console.log("Erro ao conectar no mongodb " + err)
        })

    //Public
        app.use(express.static(path.join(__dirname, "public")))

        app.use((req, res, next) => {
          //  console.log('Oi, eu sou um middleware')
            next()
        })

//Rotas
    app.get('/', (req, res) => {
        Postagem.find().sort({data: 'desc'}).lean().populate('categoria').then((postagens) => {

            res.render('index', {postagens, postagens})

        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno.')
            res.redirect('/404')
        })
        
    })

    app.get('/postagem/:slug', (req, res) => {
        
        Postagem.findOne({slug: req.params.slug}).lean().then((postagem) => {
            if (postagem) {
                res.render('postagem/index', {postagem: postagem})
            } else {
                req.flash('error_msg', 'Esta postagem não existe')
                res.redirect('/')
            }
        }).catch((err) => {
            req.flash('error', 'Houve um erro interno')
            res.redirect('/')
        })
    })

    app.get('/categorias', (req, res) => {

        Categoria.find().lean().then((categorias) => {
            res.render('categorias/index', {categorias: categorias})
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno ao listar as categorias')
            res.redirect('/')
        })
    })

    app.get('/categorias/:slug', (req, res) => {
        Categoria.findOne({slug: req.params.slug}).lean().then((categoria) => {

            if (categoria) {
                Postagem.find({categoria: categoria._id}).lean().then((postagens) => {
                    res.render('categorias/postagens', {postagens: postagens, categoria: categoria})
                })
            } else {
                req.flash('error_msg', 'Esta categoria não existe')
                res.redirect('/')
            }

        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno ao carregar a página desta categoria')
            res.redirect('/')
        })
    })

    app.get('/404', (req, res) => {
        res.send('Erro 404')
    })

    app.use('/admin', admin)
    app.use('/usuarios', usuarios)

//Outros
const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor rodando")
})