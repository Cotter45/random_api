'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      const parkStates = {
        through: 'ParkStates',
        foreignKey: 'state_id',
        otherKey: 'park_id'
      }

      State.belongsToMany(models.Park, parkStates);
    }
  }
  State.init({
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'State',
  });
  return State;
};