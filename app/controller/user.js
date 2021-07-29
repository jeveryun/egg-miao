'use strict'

class User extends C {
  async signup() {
    this.ctx.body = '注册'
  }

  async signin() {
    this.ctx.body = '登录'
  }
}

module.exports = User
