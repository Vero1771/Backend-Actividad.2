const MovieStore = require('../models/movie');

class MovieController {
  static index() {
    return MovieStore.findAll().then(movies => movies);
  }

  static newFormData() {
    return {};
  }

  static create(data) {
    const { title, duration, year } = data;
    return MovieStore.create({ title, duration: duration !== undefined ? Number(duration) : null, year: year !== undefined ? Number(year) : null })
      .then(r => r);
  }

  static findById(id) {
    return MovieStore.findById(id).then(r => r);
  }

  static update(id, data) {
    return MovieStore.update(id, {
      title: data.title,
      duration: data.duration !== undefined ? Number(data.duration) : undefined,
      year: data.year !== undefined ? Number(data.year) : undefined
    }).then(r => r);
  }

  static delete(id) {
    return MovieStore.delete(id).then(r => r);
  }

  static last5(sortBy = 'year') {
    return MovieStore.last5(sortBy).then(r => r);
  }
}

module.exports = MovieController;
