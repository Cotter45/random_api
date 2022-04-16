'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'sd.cotter45@gmail.com',
        username: 'seancotter45',
        hashedPassword: bcrypt.hashSync('ske9eter'),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['seancotter45'] }
    }, {});
  }
};
