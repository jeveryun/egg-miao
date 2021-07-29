'use strict';
const utils = require('utility');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const userArr = [];
    for (let i = 2; i <= 10; i++) {
      userArr.push({
        userName: `user${i}`,
        password: utils.md5('000000'),
        email: `user${i}@qq.com`,
        inviter_id: 0,
        weixin: 'xxx',
        weibo: 'xxx',
        receive_remote: 0,
        email_verifyed: 1,
        avatar: 'xxx.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    return queryInterface.bulkInsert('Users', userArr, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  },
};
