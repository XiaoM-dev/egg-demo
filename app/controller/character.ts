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
   * @router POST /character  列表
   * @summary 人物信息
   * @description 查询人物信息列表
   * @request body integer page 页码
   * @request body integer siez 长度
   * @response 200 listJsonBody
   */
  public async list() {
    const { ctx } = this;
    ctx.validate(listRule);
    const res = await ctx.service.character.list(ctx.request.body.page, ctx.request.body.size);
    this.success(res);
  }

  /**
   * @router PUT /character  添加
   * @summary 人物信息
   * @description 添加人物信息
   * @request body string userName 人物名
   * @request body string passWord 密码
   * @request body string type 类型
   * @response 200 indexJsonBody
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
   * @router PATCH /character  更新
   * @summary 人物信息
   * @description 更新人物信息
   * @request body string id id
   * @request body string userName 人物名
   * @request body string passWord 密码
   * @request body string type 类型
   * @response 200 indexJsonBody
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
   * @router GET /character  查询
   * @summary 人物信息
   * @description 查询人物信息
   * @request query string id id
   * @response 200 dateJsonBody
   */
  public async details() {
    const { ctx } = this;
    const res = await ctx.service.character.details(ctx.params?.id);
    this.success(res);
  }

  /**
   * @router DELETE /character  删除
   * @summary 人物信息
   * @description 删除人物信息
   * @request query string id id
   * @response 200 dateJsonBody
   */
  public async delelte() {
    const { ctx } = this;
    await ctx.service.character.delelte(ctx.query?.id);
    this.success('删除成功');
  }
}
