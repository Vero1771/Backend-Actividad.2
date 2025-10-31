const MovieStore = require('../models/movie');

class MovieController {
  // devuelve todos los movies (sin render)
  static index() {
    return MovieStore.findAll();
  }

  // datos necesarios para formulario nuevo (ninguno por ahora)
  static newFormData() {
    return {};
  }

  static create(data) {
    const { title, duration, year } = data;
    return MovieStore.create({ title, duration: Number(duration), year: Number(year) });
  }

  static findById(id) {
    return MovieStore.findById(id);
  }

  static update(id, data) {
    return MovieStore.update(id, {
      title: data.title,
      duration: data.duration !== undefined ? Number(data.duration) : undefined,
      year: data.year !== undefined ? Number(data.year) : undefined
    });
  }

  static delete(id) {
    return MovieStore.delete(id);
  }

  static last5(sortBy = 'year') {
    return MovieStore.last5(sortBy);
  }
}

module.exports = MovieController;
