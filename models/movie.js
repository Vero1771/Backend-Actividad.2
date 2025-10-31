const pool = require('../db/connection');

class MovieStore {
  // retorna todos los movies: Promise<Array>
  static findAll() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT id_pelicula, titulo, anio, duracion FROM peliculas')
        .then(([rows]) => resolve(rows.map(r => ({ id: r.id_pelicula, title: r.titulo, duration: r.duracion, year: r.anio }))))
        .catch(err => reject(err));
    });
  }

  static create({ title, duration, year }) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO peliculas (titulo, anio, duracion) VALUES (?, ?, ?)', [title, year || null, duration || null])
        .then(([result]) => resolve({ id: result.insertId, title, duration: duration ? Number(duration) : null, year: year ? Number(year) : null }))
        .catch(err => reject(err));
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT id_pelicula, titulo, anio, duracion FROM peliculas WHERE id_pelicula = ?', [id])
        .then(([rows]) => {
          if (rows.length === 0) return resolve(null);
          const r = rows[0];
          resolve({ id: r.id_pelicula, title: r.titulo, duration: r.duracion, year: r.anio });
        })
        .catch(err => reject(err));
    });
  }

  static update(id, { title, duration, year }) {
    return new Promise((resolve, reject) => {
      // build dynamic update
      const fields = [];
      const params = [];
      if (title !== undefined) { fields.push('titulo = ?'); params.push(title); }
      if (year !== undefined) { fields.push('anio = ?'); params.push(year); }
      if (duration !== undefined) { fields.push('duracion = ?'); params.push(duration); }
      if (fields.length === 0) return this.findById(id).then(resolve).catch(reject);
      params.push(id);
      pool.query(`UPDATE peliculas SET ${fields.join(', ')} WHERE id_pelicula = ?`, params)
        .then(() => this.findById(id).then(resolve).catch(reject))
        .catch(err => reject(err));
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM peliculas WHERE id_pelicula = ?', [id])
        .then(([result]) => resolve(result.affectedRows > 0))
        .catch(err => reject(err));
    });
  }

  static last5(sortBy = 'year') {
    return new Promise((resolve, reject) => {
      let order = 'anio DESC';
      if (sortBy === 'title') order = 'titulo ASC';
      pool.query(`SELECT id_pelicula, titulo, anio, duracion FROM peliculas ORDER BY ${order} LIMIT 5`)
        .then(([rows]) => resolve(rows.map(r => ({ id: r.id_pelicula, title: r.titulo, duration: r.duracion, year: r.anio }))))
        .catch(err => reject(err));
    });
  }
}

module.exports = MovieStore;
