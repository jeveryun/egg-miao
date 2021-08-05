'use strict'
const R = require('ramda')
class User extends S {
  constructor(ctx) {
    super(ctx)
    this._User = this.ctx.model.User
    this._Invitation = this.ctx.model._Invitation
    this.where = this.ctx.helper.where
  }

  /**
   * * 校验邀请码有效性
   * @param {string} code 邀请码
   * @return {boolean} 是否有效
   * @member User
   */
  async checkInvitation(code) {
    const invitation = await this._Invitation.find(this.where({ code }))
    if (!invitation || invitation.use_user_id) {
      return this.ctx.helper.throw(400, 'code', '无效的邀请码')
    }
    return invitation
  }
  /**
   * * 生成邀请码
   * @param {number} user_id 用户 ID
   * @param {number} length 生成的个数
   * @return {Array<Invitation>} 所生成的邀请码数组
   * @memberof User
   */
  async generateInvitation(user_id, length) {
    const invitation_promise = this.ctx.helper.range(length).map(() => {
      return this._Invitation.create({ user_id })
    })
    return Promise.all(invitation_promise)
  }

  async signUp() {
    const body = this.ctx.request.body
    const invitation = await this.checkInvitation(body.code)
    const user = await this._User.create(
      R.pick(['username', 'password', 'email'], body)
    )

    /* eslint-disable no-proto */
    console.dir(user.__proto__)
    console.dir(invitation.__proto__)
    invitation.use_user_id = user.id
    invitation.use_username = user.username
    await invitation.save()
    const invitations = await this.generateInvitation(user.id, 5)
    return { user, invitations }
  }
}
