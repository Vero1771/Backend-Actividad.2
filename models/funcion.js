class Funcion {
  constructor({ id, movieId, salaId, datetime }) {
    this.id = id;
    this.movieId = movieId !== undefined ? Number(movieId) : null;
    this.salaId = salaId !== undefined ? Number(salaId) : null;
    this.datetime = datetime; // ISO string
  }
}

class FuncionStore {
  static data = [];
  static nextId = 1;

  static create({ movieId, salaId, datetime }) {
    const f = new Funcion({ id: this.nextId++, movieId, salaId, datetime });
    this.data.push(f);
    return f;
  }

  static findAll() {
    return [...this.data];
  }

  static findById(id) {
    return this.data.find(x => x.id === Number(id)) || null;
  }

  static update(id, { movieId, salaId, datetime }) {
    const f = this.findById(id);
    if (!f) return null;
    if (movieId !== undefined) f.movieId = movieId ? Number(movieId) : null;
    if (salaId !== undefined) f.salaId = salaId ? Number(salaId) : null;
    if (datetime !== undefined) f.datetime = datetime;
    return f;
  }

  static delete(id) {
    const idx = this.data.findIndex(x => x.id === Number(id));
    if (idx === -1) return false;
    this.data.splice(idx, 1);
    return true;
  }

  static findByDateRange(start, end) {
    const s = start ? new Date(start) : null;
    const e = end ? new Date(end) : null;
    return this.data.filter(f => {
      const d = new Date(f.datetime);
      if (s && d < s) return false;
      if (e && d > e) return false;
      return true;
    });
  }
}

module.exports = FuncionStore;
