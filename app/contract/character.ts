const JsonBody = {
  code: { type: 'number', required: true, example: 0 },
  message: { type: 'string', required: true, example: 'success' },
};

export interface Character {
  id: string,
  userName: string,
  passWord: string,
  type: string,
}

const testStringVal = 'test string value';

module.exports = {
  listJsonBody: {
    ...JsonBody,
    data: [{ id: testStringVal, userName: testStringVal, passWord: testStringVal, type: testStringVal }],
  },

  dataJsonBody: {
    ...JsonBody,
    data: { id: testStringVal, userName: testStringVal, passWord: testStringVal, type: testStringVal },
  },

  indexJsonBody: {
    ...JsonBody,
    data: "操作成功",
  }
};

