import { BaseController } from '../core/base_controller';
import { UserInfo } from '../service/mguser';

const listRule = {
  page: { type: 'number', require: true },
  size: { type: 'number', require: true },
};

const addRule = {
  username: { type: 'string', require: true },
  password: { type: 'string', require: true },
  nickname: { type: 'string', require: true },
  tel: { type: 'string', require: true },
  email: { type: 'string', require: true },
};

const updateRule = {
  id: { type: 'number', require: true },
};

/**
 * @Controller mguser
 */
export default class UserController extends BaseController {

  /**
   * @router POST /mguser  列表
   * @summary 用户信息
   * @description 查询用户信息列表
   * @request body integer page 页码
   * @request body integer siez 长度
   * @response 200 listJsonBody
   */
  public async list() {
    const { ctx } = this;
    ctx.validate(listRule);
    const res = await ctx.service.mguser.list(ctx.request.body.page, ctx.request.body.size);
    this.success(res);
  }

  /**
   * @router PUT /mguser  添加
   * @summary 用户信息
   * @description 添加用户信息
   * @request body string userName 用户名
   * @request body string passWord 密码
   * @request body string nickName 昵称
   * @request body string tel 电话
   * @request body string email 邮箱
   * @response 200 indexJsonBody
   */
  public async add() {
    const { ctx } = this;
    ctx.validate(addRule);
    const insertData:UserInfo = {
      userGuid: 'testGuid',
      userName: ctx.request.body?.username,
      passWord: ctx.request.body?.password,
      nickName: ctx.request.body?.nickname,
      tel: ctx.request.body?.tel,
      email: ctx.request.body?.email,
    };
    
    await ctx.service.mguser.add(insertData);
    
    this.success('新增成功');
  }

  /**
   * @router PATCH /mguser  更新
   * @summary 用户信息
   * @description 更新用户信息
   * @request body integer id id
   * @request body string userName 用户名
   * @request body string passWord 密码
   * @request body string nickName 昵称
   * @request body string tel 电话
   * @request body string email 邮箱
   * @response 200 indexJsonBody
   */
  public async update() {
    const { ctx } = this;
    ctx.validate(updateRule);

    const updateData:UserInfo = {
      id: ctx.request.body?.id,
      userName: ctx.request.body?.username,
      passWord: ctx.request.body?.password,
      nickName: ctx.request.body?.nickname,
      tel: ctx.request.body?.tel,
      email: ctx.request.body?.email,
    };
    await ctx.service.mguser.update(updateData);
    this.success('更新成功');
  }

  /**
   * @router GET /mguser  查询
   * @summary 用户信息
   * @description 查询用户信息
   * @request query integer id id
   * @response 200 dateJsonBody
   */
  public async details() {
    const { ctx } = this;
    const res = await ctx.service.mguser.details(ctx.params?.id);
    this.success(res);
  }

  /**
   * @router DELETE /mguser  删除
   * @summary 用户信息
   * @description 删除用户信息
   * @request query integer id id
   * @response 200 dateJsonBody
   */
  public async delelte() {
    const { ctx } = this;
    await ctx.service.mguser.delelte(ctx.query?.id);
    this.success('删除成功');
  }
}
