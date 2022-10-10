import { BaseController } from '../core/base_controller';
import { User } from '../service/user';

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

export default class UserController extends BaseController {

  /**
   * List action #swagger-api
   *
   * @function list
   * @memberof UserController
   * @description #tags user
   * @description #produces application/json
   * @description #parameters list body schema.definitions.list true - list requset body
   * @description #responses 200 schema.user.listJsonBody - list response
   */
  public async list() {
    const { ctx } = this;
    ctx.validate(listRule);
    const res = await ctx.service.user.list(ctx.request.body.page, ctx.request.body.size);
    this.success(res);
  }

  /**
   * Add action #swagger-api
   *
   * @function add
   * @memberof UserController
   * @description #tags user
   * @description #produces application/json
   * @description #parameters add body schema.user.addBody false - add requset body
   * @description #responses 200 schema.user.indexJsonBody - add response
   */
  public async add() {
    const { ctx } = this;
    ctx.validate(addRule);
    const insertData:User = {
      userGuid: 'testGuid',
      userName: ctx.request.body?.username,
      passWord: ctx.request.body?.password,
      nickName: ctx.request.body?.nickname,
      tel: ctx.request.body?.tel,
      email: ctx.request.body?.email,
    };

    await ctx.service.user.add(insertData);

    this.success('新增成功');
  }

  /**
   * Update action #swagger-api
   *
   * @function update
   * @memberof UserController
   * @description #tags user
   * @description #produces application/json
   * @description #parameters update body schema.user.updateBody false - update requset body
   * @description #responses 200 schema.user.indexJsonBody - update response
   */
  public async update() {
    const { ctx } = this;
    ctx.validate(updateRule);

    const updateData:User = {
      id: ctx.request.body?.id,
      userName: ctx.request.body?.username,
      passWord: ctx.request.body?.password,
      nickName: ctx.request.body?.nickname,
      tel: ctx.request.body?.tel,
      email: ctx.request.body?.email,
    };
    await ctx.service.user.update(updateData);
    this.success('更新成功');
  }

  /**
   * Details action #swagger-api
   *
   * @function details
   * @memberof UserController
   * @description #tags user
   * @description #produces application/json
   * @description #parameters details path schema.definitions.id true - details query parameter
   * @description #responses 200 schema.user.dataJsonBody - details response
   */
  public async details() {
    const { ctx } = this;
    const res = await ctx.service.user.details(ctx.params?.id);
    this.success(res);
  }

  /**
   * Delelte action #swagger-api
   *
   * @function delelte
   * @memberof UserController
   * @description #tags user
   * @description #produces application/json
   * @description #parameters delelte query schema.definitions.id true - delelte query parameter
   * @description #responses 200 schema.user.dataJsonBody - delelte response
   */
  public async delelte() {
    const { ctx } = this;
    await ctx.service.user.delelte(ctx.query?.id);
    this.success('删除成功');
  }
}
