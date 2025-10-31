const FuncionStore = require('../models/funcion');
const MovieStore = require('../models/movie');
const SalaStore = require('../models/sala');

class FuncionController {
  // devuelve lista de funciones enriquecida; acepta filtro start/end opcional
  static index({ start, end } = {}) {
    let funciones = (start || end) ? FuncionStore.findByDateRange(start, end) : FuncionStore.findAll();
    funciones = funciones.map(f => ({
      ...f,
      movie: f.movieId ? MovieStore.findById(f.movieId) : null,
      sala: f.salaId ? SalaStore.findById(f.salaId) : null
    }));
    return funciones;
  }

  static newFormData() {
    const movies = MovieStore.findAll();
    const salas = SalaStore.findAll();
    return { movies, salas };
  }

  static create(data) {
    const { movieId, salaId, datetime } = data;
    return FuncionStore.create({ movieId, salaId, datetime });
  }

  static findById(id) {
    return FuncionStore.findById(id);
  }

  static editFormData(id) {
    const func = FuncionStore.findById(id);
    if (!func) return null;
    const movies = MovieStore.findAll();
    const salas = SalaStore.findAll();
    return { func, movies, salas };
  }

  static update(id, data) {
    const { movieId, salaId, datetime } = data;
    return FuncionStore.update(id, { movieId, salaId, datetime });
  }

  static delete(id) {
    return FuncionStore.delete(id);
  }

  // unlink movie or sala from a funcion (set to null)
  static unlink(id, which) {
    const func = FuncionStore.findById(id);
    if (!func) return null;
    if (which === 'movie') func.movieId = null;
    if (which === 'sala') func.salaId = null;
    return func;
  }
}

module.exports = FuncionController;
