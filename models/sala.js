class Sala {
  constructor({ id, name, capacity }) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
  }
}

class SalaStore {
  static data = [];
  static nextId = 1;

  static create({ name, capacity }) {
    const s = new Sala({ id: this.nextId++, name, capacity });
    this.data.push(s);
    return s;
  }

  static findAll() {
    return [...this.data];
  }

  static findById(id) {
    return this.data.find(x => x.id === Number(id)) || null;
  }

  static update(id, { name, capacity }) {
    const s = this.findById(id);
    if (!s) return null;
    if (name !== undefined) s.name = name;
    if (capacity !== undefined) s.capacity = capacity;
    return s;
  }

  static delete(id) {
    const idx = this.data.findIndex(x => x.id === Number(id));
    if (idx === -1) return false;
    this.data.splice(idx, 1);
    return true;
  }
}

module.exports = SalaStore;
