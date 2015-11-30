#!/usr/bin/env node
var express=require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 5000;
var mongo = require("mongodb").MongoClient;

var empresas = new Array();

app.set('../views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
	res.render( 'index',{ title:"Roberto" } );
});

app.get('/crear_empresa', function (req, res) {
	res.render( 'includes/crear_empresa' );
	
}); 

 

app.get('/crear_calificacion', function (req, res) {
	res.render( 'includes/crear_puntuacion' );
}); 

app.get('/editar_calificacion', function (req, res) {
	res.render( 'includes/editar_puntuacion' );
}); 

app.get('/borrar_calificacion', function (req, res) {
	res.render(  'includes/borrar_puntuacion' );
}); 
/**
 * Servicio web creación de empresa
 */
app.put('/crear_empresa/:nombre', function( req, response ) {
	mongo.connect("mongodb://localhost:27017/empresaDb", function(err, db) {
				var nombre_empresa = req.params.nombre;
				if(err) {
					console.log("We doesn't  connected");
				}
				else{
					var collection = db.collection('empresa');
					nombre_empresa = {"nombre":req.params.nombre };
					console.log(nombre_empresa);
					collection.insert(nombre_empresa);
					empresas.push(nombre_empresa);
					console.log(empresas);
					console.log("Realizado con exito");
					
				}
			});
			response.send("Ok");
	
});

var listarEmpresas = function(db, callback) {
   empresas = [];
   var cursor = db.collection('empresa').find();
   cursor.each(function(err, doc) {
	 if (doc != null) {
        empresas.push(doc.nombre);
      } else {
         callback();
      }
   });
  
};



app.get('/listar_empresa',function(req,response){
	mongo.connect("mongodb://localhost:27017/empresaDb",function(err, db){
		if (err){
			console.log("Fallo en la conexión");
		}
		else{
			listarEmpresas(db, function() {
					db.close();
			});
		}
	});
	response.send(empresas);
});

app.get('/borrar_empresa/:nombre',function(req,response){
	mongo.connect("mongodb://localhost:27017/empresaDb",function(err, db){
		if (err){
			console.log("Fallo en la conexión");
		}
		else{
			var borrar_empresa = function(db, callback) {
			db.collection('empresa').deleteOne({"nombre":req.params.nombre},
			function(err, resultado) {
				callback();
			   });
			};
			
			borrar_empresa(db, function() {
					listarEmpresas(db,function(){
						db.close();
					});
					db.close();
			});
		}
	});
	response.send(empresas);
});



app.listen(port); 
console.log('Server running at http://127.0.0.1:'+port+'/');

module.exports = app;