if(process.env.NODE_ENV == 'production'){

    module.exports = {mongoURI: 'mongodb+srv://marcosgalvaotecnologia:Mag_23degiu@cluster0.nv1wy.mongodb.net/<dbname>?retryWrites=true&w=majority'}

}else{

    module.exports = {mongoURI: 'mongodb://localhost/blog_appp'}

}