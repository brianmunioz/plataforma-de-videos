const { BaseRepositorio} = require(".");

class UsuarioRepositorio extends BaseRepositorio{
    constructor({usuario}){
        super(usuario);
    }
}
module.exports = UsuarioRepositorio;