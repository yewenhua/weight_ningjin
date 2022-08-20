'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('attachments', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      extname: STRING(50),
      filename: STRING(250),
      extra: STRING(200),
      url: STRING(250),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attachments');
  }
};
