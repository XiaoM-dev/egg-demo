import { BaseController } from '../core/base_controller';
import { User } from '../service/user';

const listRule = {
  page: { type: 'number', require: true },
  size: { type: 'number', require: true },
}

const addRule = {
  username: { type: 'string', require: true },
  password: { type: 'string', require: true },
  nickname: { type: 'string', require: true },
  tel: { type: 'string', require: true },
  email: { type: 'string', require: true },
}

const updateRule = {
  id:{ type: 'number', require: true }, 
}

export default class HomeController extends BaseController {
  public async list() {
    const { ctx } = this;
    ctx.validate(listRule);
    const res = await ctx.service.user.list(ctx.request.body.page, ctx.request.body.size);
    this.success(res)
  }

  public async add() {
    const { ctx } = this;
    ctx.validate(addRule)
    let insertData:User = {
      userGuid: "testGuid",
      userName: ctx.request.body?.username,
      passWord: ctx.request.body?.password,
      nickName: ctx.request.body?.nickname,
      tel: ctx.request.body?.tel,
      email: ctx.request.body?.email,
    }

    await ctx.service.user.add(insertData);
    
    this.success("新增成功")
  }

  public async update() {
    const { ctx } = this;
    ctx.validate(updateRule);

    let updateData:User = {
      id: ctx.request.body?.id,
      userName: ctx.request.body?.username,
      passWord: ctx.request.body?.password,
      nickName: ctx.request.body?.nickname,
      tel: ctx.request.body?.tel,
      email: ctx.request.body?.email,
    }
    await ctx.service.user.update(updateData);
    this.success("更新成功")
  }

  public async details() {
    const { ctx } = this;
    const res = await ctx.service.user.details(ctx.params?.id);  
    this.success(res)
  }

  public async delelte() {
    const { ctx } = this;
    await ctx.service.user.delelte(ctx.query?.id);
    this.success("删除成功")
  }
}
