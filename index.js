const express = require('express');
const req = require('express/lib/request');
const { json, send } = require('express/lib/response');
const app = express();
const PORT= 8080;

const listaUsuario = [];  

app.use(express.json());

app.get('/usuarios', (req, res) => {
    res.status(200);
    res.send(listaUsuario);  
});

app.post('/usuarios', (req, res) => {

    try {
        const { nomeUsuario, email, senha, nome } = req.body;
        const usuario = { nomeUsuario, email, senha, nome };
        
        validarUsuario(usuario); 
        
        listaUsuario.push(usuario);

        res.status(201);
        res.send();
    } catch (error) {
        res.status(400);
        res.send(error.message);
    }
});

app.get('/usuarios/:nomeUsuario', (req, res) => {
    try {
        const { nomeUsuario } = req.params;
        const usuarioAchado = procurarUsuarioPeloNomeDeUsuario(nomeUsuario); 
        const { nome, email } = usuarioAchado;
        const usuario = { nome, email, nomeUsuario };
    
        res.status(200);
        res.send(usuario);
    } catch (error) {
        res.status(404);
        res.send(error.message);
    }
});

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
);


function validarUsuario(usuario) { 
    validarNomeUsuario(usuario.nomeUsuario),
    validarEmail(usuario.email),
    validarNome(usuario.nome),
    validarSenha(usuario.senha);
}

function validarNomeUsuario(nomeUsuario) {
    if (!nomeUsuario) {
        throw new Error("O campo nomeUsuario esta vazio, por favor preencha o campo.");
    }

    for (let i = 0; i < listaUsuario.length; i++) {
        if (listaUsuario[i].nomeUsuario === nomeUsuario) {
           throw new Error("Nome ja cadastrado, escolha um outro nome de usuario!");
        } 
    }
}

function validarEmail(email) {
    if (!email) {
        throw new Error("O campo email esta vazio, por favor preencha o campo.");
    }
    for (let i = 0; i < listaUsuario.length; i++) {
        if (listaUsuario[i].email === email) {
            throw new Error("Email ja cadastrado,escolha outro email");
        }
    }
}

function validarNome(nome) {
    if (!nome) {
       throw new Error("O campo do nome esta vazio, por favor preencha o campo.");
    }
}

function validarSenha(senha) { 
    if (!senha) {
        throw new Error("O campo da senha  esta vazio, por favor preencha o campo.");
     }

    if (senha.length < 6) {
        throw new Error("A senha deve conter 6 digitos");
    }
}

function procurarUsuarioPeloNomeDeUsuario(nomeUsuario) {
    for (let i = 0; i < listaUsuario.length; i++) {
        if (listaUsuario[i].nomeUsuario === nomeUsuario) {
            return listaUsuario[i];
        } else {
            throw new Error("Usuario não encontrado, por favor digite outro nome de usuario");
        }
    }

}

