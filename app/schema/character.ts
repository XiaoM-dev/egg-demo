export interface Character {
  id: string,
  userName: string,
  passWord: string,
  type: string,
}

const testStringVal: string = 'test string value';

const CharacterExample = {
  id: { type: 'string', default: testStringVal },
  userName: { type: 'string', default: testStringVal },
  passWord: { type: 'string', default: testStringVal },
  type: { type: 'string', default: testStringVal },
}

const JsonBody = {
  code: { type: 'number', default: 200 },
  message: { type: 'string', default: "成功" },
};

const ListCommonBody = {
  page: { type: 'number', default: 1 },
  size: { type: 'number', default: 10 },
  count: { type: 'number', default: 100 },
}

const ListBody = {
  list: {
    type: "array",
    items: {
      type: "object",
      properties: {
        ...CharacterExample
      }
    }
  },
}

module.exports = {
  addBody: {
    type: 'object',
    properties: {
      ...CharacterExample
    },
    required: [ 'userName', 'passWord', 'type' ],
    additionalProperties: false,
  },

  updateBody: {
    type: 'object',
    properties: {
      ...CharacterExample
    },
    required: [ 'id' ],
    additionalProperties: false,
  },

  listJsonBody: {
    type: 'object',
    properties: {
      ...JsonBody,
      data: {
        type: "object",
        properties: {
          ...ListCommonBody,
          ...ListBody,
        }
      },
    }
  },

  dataJsonBody: {
    type: 'object',
    properties: {
      ...JsonBody,
      data: {
        type: "object",
        properties: {
          ...CharacterExample
        }
      },
    }
  },

  indexJsonBody: {
    type: 'object',
    properties: {
      ...JsonBody,
      data: {
        type: "string",
        default: "操作成功"
      },
    }
  }
};

