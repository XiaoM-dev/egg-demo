import { BaseController } from '../core/base_controller';
import { Character } from '../service/character';

const listRule = {
  page: { type: 'number', require: true },
  size: { type: 'number', require: true },
};

const addRule = {
  username: { type: 'string', require: true },
  password: { type: 'string', require: true },
  type: { type: 'string', require: true },
};

const updateRule = {
  id: { type: 'string', require: true },
};

export default class CharacterController extends BaseController {

  /**
   * List action #swagger-api
   *
   * @function list
   * @memberof CharacterController
   * @description #tags character
   * @description #produces application/json
   * @description #parameters list body schema.definitions.list true - list requset body
   * @description #responses 200 schema.character.listJsonBody - list response
   */
  public async list() {
    const { ctx } = this;
    ctx.validate(listRule);
    const res = await ctx.service.character.list(ctx.request.body.page, ctx.request.body.size);
    this.success(res);
  }

  /**
   * Add action #swagger-api
   *
   * @function add
   * @memberof CharacterController
   * @description #tags character
   * @description #produces application/json
   * @description #parameters add body schema.character.addBody false - add requset body
   * @description #responses 200 schema.character.indexJsonBody - add response
   */
  public async add() {
    const { ctx } = this;
    ctx.validate(addRule);
    const insertData:Character = {
      userName: ctx.request.body?.username,
      passWord: ctx.request.body?.password,
      type: ctx.request.body?.type,
    };

    await ctx.service.character.add(insertData);

    this.success('新增成功');
  }

  /**
   * Update action #swagger-api
   *
   * @function update
   * @memberof CharacterController
   * @description #tags character
   * @description #produces application/json
   * @description #parameters update body schema.character.updateBody false - update requset body
   * @description #responses 200 schema.character.indexJsonBody - update response
   */
  public async update() {
    const { ctx } = this;
    ctx.validate(updateRule);

    const updateData:Character = {
      id: ctx.request.body?.id,
      userName: ctx.request.body?.username,
      passWord: ctx.request.body?.password,
      type: ctx.request.body?.nickname,
    };
    await ctx.service.character.update(updateData);
    this.success('更新成功');
  }

  /**
   * Details action #swagger-api
   *
   * @function details
   * @memberof CharacterController
   * @description #tags character
   * @description #produces application/json
   * @description #parameters details path schema.definitions.id true - details query parameter
   * @description #responses 200 schema.character.dataJsonBody - details response
   */
  public async details() {
    const { ctx } = this;
    const res = await ctx.service.character.details(ctx.params?.id);
    this.success(res);
  }

  /**
   * Delelte action #swagger-api
   *
   * @function delelte
   * @memberof CharacterController
   * @description #tags character
   * @description #produces application/json
   * @description #parameters delelte query schema.definitions.id true - delelte query parameter
   * @description #responses 200 schema.character.dataJsonBody - delelte response
   */
  public async delelte() {
    const { ctx } = this;
    await ctx.service.character.delelte(ctx.query?.id);
    this.success('删除成功');
  }
}
