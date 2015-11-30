var request = require('supertest'), 
app = require('../routes/index.js');

describe( 'Pruebas ', function() {
	
	it('Página Principal', function (done) {
	request(app)
		.get('/')
		.expect('Content-Type',"text/html; charset=utf-8")
		.expect(200,done);
		
	});
	
	it('Añadir una nueva empresa', function (done) {
	request(app)
		.put('/crear_empresa/NuevaEmpresaPrueba')
		.expect('Content-Type',"text/html; charset=utf-8")
		.expect(200,done);
		
	});
	
	it('Listar una empresa', function (done) {
	request(app)
		.get('/listar_empresa')
		.expect('Content-Type',"application/json; charset=utf-8")
		.expect(200,done);
		
	});
	
	
});