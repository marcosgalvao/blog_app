if(process.env.NODE_ENV == 'production'){

    module.exports = {mongoURI: 'mongodb://marcosgalvaotecnologia:Mag_23degiu@cluster0-shard-00-00.nv1wy.mongodb.net:27017,cluster0-shard-00-01.nv1wy.mongodb.net:27017,cluster0-shard-00-02.nv1wy.mongodb.net:27017/mgtecdb?ssl=true&replicaSet=atlas-ifx9j8-shard-0&authSource=admin&retryWrites=true&w=majority'}

}else{

  module.exports = {mongoURI: 'mongodb://localhost/blog_appp'}

}