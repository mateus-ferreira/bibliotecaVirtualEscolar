const app =  require('../src/index.js');

const assert = require('assert');
const chai = require('chai')
const chaiHttp = require('chai-http');
const chaiJson = require('chai-json-schema');

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

describe('Testes CRUD de livros', () => {
    describe('Create', () =>{
        it('cadastrar um livro do Pequeno Principe corretamente', (done) => {
            chai.request(app)
            .post('/livro')
            .send({codigo: 2, titulo: "Pequeno Principe", autor: "Antoine de Saint-Exupéry", categoria: "literatura", quantidade: 2 })
            .end(function (err,res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
            })
        });

        it('cadastrar um livro do Pequeno Principe com código incorreto', (done) => {
            chai.request(app)
            .post('/livro')
            .send({codigo: "12E4", titulo: "Pequeno Principe", autor: "Antoine de Saint-Exupéry", categoria: "literatura", quantidade: 2 })
            .end(function (err,res) {
                expect(err.response.body.error).to.be.equal('Código Inválido');
                expect(res).to.have.status(400);
                done();
            })
        });

        it('cadastrar um livro do Pequeno Principe sem código', (done) => {
            chai.request(app)
            .post('/livro')
            .send({codigo: "", titulo: "Pequeno Principe", autor: "Antoine de Saint-Exupéry", categoria: "literatura", quantidade: 2 })
            .end(function (err,res) {
                expect(err.response.body.error).to.be.equal('Um ou mais campos ausentes');
                expect(res).to.have.status(400);
                done();
            })
        });

        it('cadastrar um livro do Pequeno Principe sem título', (done) => {
            chai.request(app)
            .post('/livro')
            .send({codigo: 1235, titulo: "", autor: "Antoine de Saint-Exupéry", categoria: "literatura", quantidade: 2 })
            .end(function (err,res) {
                expect(err.response.body.error).to.be.equal('Um ou mais campos ausentes');
                expect(res).to.have.status(400);
                done();
            })
        });

        it('cadastrar um livro do Pequeno Principe sem título', (done) => {
            chai.request(app)
            .post('/livro')
            .send({codigo: 1235, titulo: "Pequeno Príncipe", autor: "", categoria: "literatura", quantidade: 2 })
            .end(function (err,res) {
                expect(err.response.body.error).to.be.equal('Um ou mais campos ausentes');
                expect(res).to.have.status(400);
                done();
            })
        });

        it('cadastrar um livro vazio', (done) => {
            chai.request(app)
            .post('/livro')
            .send({ codigo: "", titulo: "", autor: "", categoria: "", quantidade: ""})
            .end(function (err,res) {
                expect(err.response.body.error).to.be.equal('Um ou mais campos ausentes');
                expect(res).to.have.status(400);
                done();
            })
        });
    })

    describe('Read', () => {
        it('get em todos os livros disponíveis', (done) => {
            chai.request(app)
            .get('/livros')
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
        });

        it('get em um livro usando o código', (done) => {
            chai.request(app)
            .get('/livro/2')
            .end(function(err,res) {
                expect(err.response.body.error).to.be.equal('Livro não existe');
                expect(res).to.have.status(200);
                done();
            })
        });

        it('get em um livro usando o título', (done) => {
            chai.request(app)
            .get('/livro/PequenoPrincipe')
            .end(function(err,res) {
                expect(err.response.body.error).to.be.equal('Livro não existe');
                expect(res).to.have.status(200);
                done();
            })
        })
    })
})