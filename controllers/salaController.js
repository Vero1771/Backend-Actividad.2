const SalaStore = require('../models/sala');

class SalaController {
  static index() {
    return SalaStore.findAll().then(r => r);
  }

  static newFormData() {
    return {};
  }

  static create(data) {
    const { name, capacity } = data;
    return SalaStore.create({ name, capacity: capacity !== undefined ? Number(capacity) : null }).then(r => r);
  }

  static findById(id) {
    return SalaStore.findById(id).then(r => r);
  }

  static editFormData(id) {
    return SalaStore.findById(id).then(r => r);
  }

  static update(id, data) {
    return SalaStore.update(id, { name: data.name, capacity: data.capacity !== undefined ? Number(data.capacity) : undefined }).then(r => r);
  }

  static delete(id) {
    return SalaStore.delete(id).then(r => r);
  }
}

module.exports = SalaController;
