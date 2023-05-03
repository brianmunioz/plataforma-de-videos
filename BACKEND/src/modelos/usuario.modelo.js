const mongoose = require('mongoose');
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');
const SchemaUsuario = new Schema({
    nombre: { type: String, required: true },
    apellido: {type: String, required: true},
    nombredeusuario: { type: String, required: true },
    usuarios: [{
        usuarioPrincipal: {type: String, required: true}
    },{
        usuarioSecundario: {type: String}
    },{
        usuarioTerciario: {type: String}
    }],
    password: { type: String, required: true },
    rol: {type: String, default: 'usuario', required: true}
},{versionKey: false,
    timestamps: true});
SchemaUsuario.methods.toJSON = function () {
    let usuario = this.toObject();
    delete usuario.password;
    return usuario;
}
SchemaUsuario.methods.compararPasswords = function (password) {
    return compareSync(password, this.password);
}
SchemaUsuario.pre('findOneAndUpdate', async function(next){
  const usuario = await this.model.findOne(this.getQuery());
  if (!usuario.isModified('password')) {
    return next();
}

const salt = genSaltSync(10);
const passwordEncriptada = hashSync(usuario.password, salt);
usuario.password = passwordEncriptada;
next()
})
SchemaUsuario.pre('save', async function (next) { 
    const usuario = this;
    if (!usuario.isModified('password')) {
        return next();
    }
 
    const salt = genSaltSync(10);
    const passwordEncriptada = hashSync(usuario.password, salt);
    usuario.password = passwordEncriptada;
    next()
})

module.exports = mongoose.model('usuario', SchemaUsuario);