import { Service } from 'egg';

export interface UserInfo {
  id?: string,
  userGuid?: string,
  userName: string,
  passWord: string,
  nickName: string,
  tel: string,
  email: string,
}
/**
 * Mguser Service
 */
export default class MguserService extends Service {

  public async list(page: number, size: number) {
    return this.ctx.model.MgUser.find({}).skip((page - 1) * size).limit(size)
  }

  public async add(insertData:UserInfo) {
    return this.ctx.model.MgUser.create(insertData)
  }

  public async update(updateData:UserInfo) {
    deleteNullItem(updateData);
    return this.ctx.model.MgUser.updateOne({id: updateData.id}, updateData);
  }

  public async details(id: string) {
    return this.ctx.model.MgUser.findById(id);
  }


  public async delelte(id: string) {
    return this.ctx.model.MgUser.remove({id});
  }
}


function deleteNullItem(checkData: any) {
  for (const key in checkData) {
    if (checkData[key] === '' || checkData[key] === undefined) {
      delete checkData[key];
    }
  }
}

