const SalaStore = require('../models/sala');

class SalaController {
  static index() {
    return SalaStore.findAll();
  }

  static newFormData() {
    return {};
  }

  static create(data) {
    const { name, capacity } = data;
    return SalaStore.create({ name, capacity: Number(capacity) });
  }

  static findById(id) {
    return SalaStore.findById(id);
  }

  static editFormData(id) {
    return SalaStore.findById(id);
  }

  static update(id, data) {
    return SalaStore.update(id, { name: data.name, capacity: data.capacity !== undefined ? Number(data.capacity) : undefined });
  }

  static delete(id) {
    return SalaStore.delete(id);
  }
}

module.exports = SalaController;
