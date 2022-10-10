const testStringVal: string = 'test string value';
// const testIntVal: number = 1;
const testEmailVal: string = 'XdsaX@qq.com';

const UserExample = {
  id: { type: 'string', default: testStringVal },
  userGuid: { type: 'string', default: testStringVal },
  userName: { type: 'string', default: testStringVal },
  passWord: { type: 'string', default: testStringVal },
  nickName: { type: 'string', default: testStringVal },
  tel: { type: 'string', default: testStringVal },
  email: { type: 'string', default: testEmailVal },
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
        ...UserExample
      }
    }
  },
}

module.exports = {
  addBody: {
    type: 'object',
    properties: {
      ...UserExample
    },
    required: [ 'userGuid', 'userName', 'passWord', 'nickName', 'tel', 'email' ],
    additionalProperties: false,
  },

  updateBody: {
    type: 'object',
    properties: {
      ...UserExample
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
          ...UserExample
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

