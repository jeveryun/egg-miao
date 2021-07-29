'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User'
    }
  )

  /**
   * * 哈希密码 Hooks
   * @param {User} user 用户实例
   * @return {void}
   */
  async function hashPwd(user) {
    if (!user.changed('password')) {
      return
    }
    user.password = await bcrypt.hash(user.password, 10)
  }

  User.beforeSave(hashPwd)

  /**
   * * 用户登录方法
   * @param {string} email 邮箱
   * @param {string} password 密码
   * @return {(User|boolean)} 登录成功的用户
   */
  User.Auth = async function(email, password) {
    const user = await this.findOne({
      where: {
        email
      }
    })
    if (await bcrypt.compare(password, user.password)) {
      return user
    }
    return false
  }

  return User
}
