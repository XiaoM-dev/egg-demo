import { Service } from 'egg';

export interface User {
  id?: number,
  userGuid?: string,
  userName: string,
  passWord: string,
  nickName: string,
  tel: string,
  email: string,
}

/**
 * User Service
 */
export default class UserService extends Service {
  
  public async list(page, size: number){
    return this.app.mysql.select("user", {
      columns: ['userGuid', 'userName', 'passWord', "nickName", "tel", "email"], // 要查询的表字段
      orders: [['userGuid','desc'],['id','desc']], // 排序方式
      limit: size, // 返回数据量
      offset: (page-1)*size, // 数据偏移量
    })
  }

  public async add(insertData:User){
    return this.app.mysql.insert("user", {...insertData})
  }
  
  public async update(updateData:User){
    deleteNullItem(updateData)
    console.log(updateData, "updateData");
    return this.app.mysql.update("user", updateData)
  }

  public async details(id: string){
    const res = await this.app.mysql.query(`SELECT * FROM user WHERE id=${id}`)
    return res
  }

  
  public async delelte(id: string){
    return this.app.mysql.delete("user", {userGuid:id})
  }
}


function deleteNullItem(checkData: any) {
  for(let key in checkData){
    if(checkData[key] == '' || checkData[key] == undefined){
      delete checkData[key]
    }
  }
  console.log(checkData, "checkData");
  
}

