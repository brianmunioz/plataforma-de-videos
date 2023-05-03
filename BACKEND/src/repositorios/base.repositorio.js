class BaseRepositorio {
    constructor(modelo) {
        this.modelo = modelo;
    }
    async obtener(id) {
        return await this.modelo.findById(id);
    }
    async obtenerTodo(tamanoPagina = 5, numeroDePagina = 1) {
        const saltosDePagina = tamanoPagina * (numeroDePagina - 1);
        return await this.modelo
            .find()
            .sort('-createdAt')
            .skip(saltosDePagina)
            .limit(tamanoPagina);
    }
    async crear(entity) {
        return await this.modelo.create(entity);
    }
    async actualizar(id, entity) {
        return await this.modelo.findByIdAndUpdate(id, entity, { new: true  });
    }
    async borrar(id) {
        return await this.modelo.findByIdAndDelete(id);
    }

}
module.exports = BaseRepositorio;