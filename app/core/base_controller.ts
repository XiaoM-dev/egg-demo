import { Controller } from 'egg';

export class BaseController extends Controller { // 其他session也可以考虑封装进来
  success(data: any) {
    this.ctx.body = {
      status: 200,
      success: true,
      data,
    };
  }

  notFound(msg: string) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
