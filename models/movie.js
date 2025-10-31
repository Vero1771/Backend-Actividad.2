class Movie {
  constructor({ id, title, duration, year }) {
    this.id = id;
    this.title = title;
    this.duration = duration; // minutes
    this.year = year;
  }
}

class MovieStore {
  static data = [];
  static nextId = 1;

  static create({ title, duration, year }) {
    const m = new Movie({ id: this.nextId++, title, duration, year });
    this.data.push(m);
    return m;
  }

  static findAll() {
    return [...this.data];
  }

  static findById(id) {
    return this.data.find(x => x.id === Number(id)) || null;
  }

  static update(id, { title, duration, year }) {
    const m = this.findById(id);
    if (!m) return null;
    if (title !== undefined) m.title = title;
    if (duration !== undefined) m.duration = duration;
    if (year !== undefined) m.year = year;
    return m;
  }

  static delete(id) {
    const idx = this.data.findIndex(x => x.id === Number(id));
    if (idx === -1) return false;
    this.data.splice(idx, 1);
    return true;
  }

  // devuelve los primeros 5 según criterio (year o title)
  static last5(sortBy = 'year') {
    const arr = [...this.data];
    if (sortBy === 'title') {
      arr.sort((a, b) => (a.title || '').localeCompare(b.title));
      return arr.slice(-5).reverse();
    }
    // default: por año descendente
    arr.sort((a, b) => (b.year || 0) - (a.year || 0));
    return arr.slice(0, 5);
  }
}

module.exports = MovieStore;
