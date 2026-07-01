export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findById(id, select = '', populate = []) {
    let query = this.model.findById(id).select(select);
    if (populate.length > 0) {
      populate.forEach((pop) => {
        query = query.populate(pop);
      });
    }
    return await query.lean().exec();
  }

  async findOne(filter, select = '', populate = []) {
    let query = this.model.findOne(filter).select(select);
    if (populate.length > 0) {
      populate.forEach((pop) => {
        query = query.populate(pop);
      });
    }
    return await query.lean().exec();
  }

  async find(filter = {}, options = {}) {
    const { select = '', sort = '-createdAt', limit = 10, skip = 0, populate = [] } = options;
    let query = this.model.find(filter).select(select).sort(sort).skip(skip).limit(limit);
    if (populate.length > 0) {
      populate.forEach((pop) => {
        query = query.populate(pop);
      });
    }
    return await query.lean().exec();
  }

  async updateById(id, data, options = { new: true, runValidators: true }) {
    return await this.model.findByIdAndUpdate(id, data, options).lean().exec();
  }

  async deleteById(id) {
    return await this.model.findByIdAndDelete(id).lean().exec();
  }

  async count(filter = {}) {
    return await this.model.countDocuments(filter).exec();
  }
}
