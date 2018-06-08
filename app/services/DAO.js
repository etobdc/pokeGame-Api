function DAOFn () {
  return class DAO {
    constructor (app) {
      this.primaryKey = 'id'
      this.fields = new app.helpers.FieldsHandler()
      this.table = ''
      this.knex = app.services.Database
    }

    all () {
      return this.find({})
    }

    store (data) {
      // data = this.fields.filter(data)
      return this.knex(this.table)
        .insert(data)
        .then(id => id[0])
    }

    find (where) {
      where = this.formatWhere(where)
      return this.knex()
        .select()
        .from(this.table)
        .where(where)
    }

    destroy (where) {
      where = this.formatWhere(where)
      return this.knex(this.table)
        .where(where)
        .del()
    }

    save (data, where) {
      // TODO: filter not editable fields;
      data = this.fields.filter(data)
      where = this.formatWhere(where)
      return this.knex(this.table)
        .where(where)
        .update(data)
    }

    count (where) {
      where = this.formatWhere(where)
      return this.knex(this.table)
        .count('id as count')
        .where(where)
        .then(result => result[0].count)
    }

    formatWhere (where) {
      if (typeof where === 'number') {
        where = {
          [this.primaryKey]: where
        }
      }
      where = this.fields.filter(where)
      return where
    }
  }
}

module.exports = DAOFn
