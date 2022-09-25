import { Service } from 'egg';

export interface Character {
  id?: String,
  userName: string,
  passWord: string,
  type: string,
}

/**
 * Character Service
 */
export default class CharacterService extends Service {

  public async list(page, size: number) {
    return this.app.elasticsearch.search({
      index: 'character',
      from: (page - 1) * size, //skip
      size: size,
      body: {
        query: {
          match_all: {}
        }
      }
    })
  }

  public async add(insertData:Character) {
    return this.app.elasticsearch.bulk({
      body: [
        { update: { _index: 'character' } },
        { doc: insertData },
      ]
    });
  }

  public async update(updateData:Character) {
    deleteNullItem(updateData);
    return this.app.elasticsearch.bulk({
      body: [
        { update: { _index: 'character' } },
        { doc: {...updateData} },
      ]
    });
  }

  public async details(id: string) {
    return this.app.elasticsearch.search({
      index: 'character',
      body: {
        query: {
          match: {
            id: id
          }
        }
      }
    });
  }

  public async delelte(id: string) {
    return this.app.elasticsearch.bulk({
      body: [
        { delete: { _index: 'character', _id: id } },
      ]
    });
  }
}


function deleteNullItem(checkData: any) {
  for (const key in checkData) {
    if (checkData[key] === '' || checkData[key] === undefined) {
      delete checkData[key];
    }
  }
}

