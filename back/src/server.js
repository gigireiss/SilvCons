const express = require('express');
const cors = require('cors');

const porta = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(porta, () => console.log(`Rodando na porta ${porta}`));

const connection = require('../sql');
//const upload = require('./multer')

app.post('/usuario/cadastrar', (request,response) => {
    let params = Array(
        request.body.name,
        request.body.email,
        request.body.password,
        request.body.cpf_number,
    );

    let query = "INSERT INTO users(name,email,password,cpf_number) VALUES(?,?,?,?);";

    connection.query(query,params, (err,results) => {
        if(results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Sucesso",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "sem sucesso",
                data: err
            })
        }
    })
})

app.get('/usuario/listar', (request,response) => {
    const query = "SELECT * FROM users";

    connection.query(query,params, (err,results) =>{
        if(results) {
            response
            .status(200)
            .json({
                sucess: true,
                message: "Sucesso",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                sucess: false,
                message: "sem sucesso",
                data: err
            })
        }
    })

    
})

app.put('/usuario/editar/:id', (request,response) => {
    let params = Array(
        request.body.name,
        request.params.id
    );

    console.log(params);
    

    let query = "UPDATE users SET name = ? WHERE id = ?";
    
    connection.query(query, params, (err, results) => {
        if(results) {
            response 
            .status(200)
            .json({
                sucess: true,
                message: "Editado com sucesso",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                sucess: false,
                message: "sem sucesso",
                data: err
            })
        }
    })
})

app.delete('/usuario/deletar/:id', (request,response) => {
    let params = Array(
        request.params.id
    );

    let query = "DELETE FROM users WHERE id = ?;"

    connection.query(query, params, (err, results) => {
        if(results) {
            response
            .status(200)
            .json({
                sucess: true,
                message: "Deletado com sucesso",
                data: results
            })
        } else {
            response 
            .status(400)
            .json({
                sucess: false,
                message: "sem sucesso",
                data: err
            })
        }
    })
})

app.post('/login', (request, response) => {
    let params = Array(
        request.body.email
    )

    let query = "SELECT * FROM users WHERE email = ?";

    connection.query(query, params, (err, results) => {
        if(results.length > 0) {
            let senhaDigitada = request.body.password
            let senhaBanco = results[0].password

            if (senhaBanco == senhaDigitada) {
            response
              .status(200)
              .json({
                success: true,
                message: "Sucesso",
                data: results[0]
              })
          } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Verifique sua senha!"
            })
          }
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "Email não cadastrado!"
            })
        }
    })
})

app.get('/localidades/listar', (request, response) => {
    const query = "SELECT * FROM localidades";

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao buscar localidades:", err);
            response.status(500).json({
                success: false,
                message: "Erro ao buscar localidades",
                data: err
            });
        } else {
            response.status(200).json({
                success: true,
                message: "Localidades encontradas",
                data: results
            });
        }
    });
});
