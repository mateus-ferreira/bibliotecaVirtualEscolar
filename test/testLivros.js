const app =  require('../src/index');

const assert = require('assert');
const chai = require('chai')
const chaiHttp = require('chai-http');
const chaiJson = require('chai-json-schema');
const { CampoInvalido } = require('../src/erros/erros');
const { send } = require('process');

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

describe('Testes CRUD de livros', () => {
    describe('Create', () =>{
        it('cadastrar um livro do Pequeno Principe corretamente', (done) => {
            chai.request(app)
            .post('/cadastroLivro')
            .send({codigo: 1234, titulo: "Pequeno Principe", autor: "Antoine de Saint-Exupéry", editora : "Amazon" })
            .end(function (err,res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
            })
        });

        it('cadastrar um livro do Pequeno Principe com código incorreto', (done) => {
            chai.request(app)
            .post('/cadastroLivro')
            .send({codigo: "12E5", titulo: "Pequeno Principe", autor: "Antoine de Saint-Exupéry", editora : "Amazon" })
            .end(function (erro,res) {
                console.log("PRINT DA RESPOSTA", erro)
                expect(erro).to.be.instanceOf(CampoInvalido);
                expect(res).to.have.status(400);
                done();
            })
        });

        it('cadastrar um livro do Pequeno Principe sem código', (done) => {
            chai.request(app)
            .post('/cadastroLivro')
            .send({codigo: "", titulo: "Pequeno Principe", autor: "Antoine de Saint-Exupéry", editora : "Amazon" })
            .end(function (err,res) {
                expect(err).to.be.equal('Campo inválido');
                expect(res).to.have.status(200);
                done();
            })
        });

        it('cadastrar um livro do Pequeno Principe sem título', (done) => {
            chai.request(app)
            .post('/cadastroLivro')
            .send({codigo: 1235, titulo: "", autor: "Antoine de Saint-Exupéry", editora : "Amazon" })
            .end(function (err,res) {
                expect(err).to.be.equal('Campo inválido');
                expect(res).to.have.status(400);
                done();
            })
        });

        it('cadastrar um livro do Pequeno Principe sem autor', (done) => {
            chai.request(app)
            .post('/cadastroLivro')
            .send({codigo: 1235, titulo: "Pequeno Príncipe", autor: "", editora : "Amazon" })
            .end(function (err,res) {
                expect(err).to.be.equal('Campo inválido');
                expect(res).to.have.status(400);
                done();
            })
        });

        it('cadastrar um livro do Pequeno Principe sem editora', (done) => {
            chai.request(app)
            .post('/cadastroLivro')
            .send({codigo: 1240, titulo: "Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", editora : "" })
            .end(function (err,res) {
                expect(err).to.be.equal('Campo inválido');
                expect(res).to.have.status(400);
                done();
            })
        });

        it('cadastrar um livro vazio', (done) => {
            chai.request(app)
            .post('/cadastroLivro')
            .send({ codigo: "", titulo: "", autor: "", editora : ""})
            .end(function (err,res) {
                expect(err).to.be.equal('Campo inválido');
                expect(res).to.have.status(400);
                done();
            })
        });
    })

    describe('Read', () => {
        it('get em todos os livros disponíveis', (done) => {
            chai.request(app)
            .get('/listaLivros')
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
        });

        it('get em um livro usando o código inexistente', (done) => {
            chai.request(app)
            .get('/livroCodigo/3')
            .end(function(err,res) {
                expect(err).to.be.equal('');
                expect(res).to.have.status(204);
                done();
            })
        });

        it('get em um livro usando o título inexistente', (done) => {
            chai.request(app)
            .get('/livroTitulo/Pequeno Principe')
            .end(function(err,res) {
                expect(err.response.body.error).to.be.equal('Livro não existe');
                expect(res).to.have.status(204);
                done();
            })
        })
    })

    describe('update', () => {
        it('atualizar um livro existente', (done) => {
            chai.request(app)
            .put('/editarLivro/1234')
            .send({codigo: 99137, titulo: "Pequeno Principe", autor: "Antoine de Saint-Exupéry", editora : "Amazon" })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
        })
    })

    describe('delete', () => {
        it('deletar um livro existente', (done) => {
            chai.request(app)
            .delete('/excluirLivro/99137')
            .end(function(err, res) {
                expect(err).to.be.eq('Not Found');
                expect(res).to.have.status(200);
                done();
            })
        })
    })
})