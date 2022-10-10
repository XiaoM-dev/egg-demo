const JsonBody = {
  code: { type: 'number', required: true, example: 0 },
  message: { type: 'string', required: true, example: 'success' },
};

interface User {
  id: string,
  userGuid: string,
  userName: string,
  passWord: string,
  nickName: string,
  tel: string,
  email: string,
}

const testStringVal = 'test string value';
const testIntVal = 1;
const testEmailVal = 'XdsaX@qq.com';


module.exports = {
  listJsonBody: {
    ...JsonBody,
    data: [{ id: testIntVal, userGuid: testStringVal, userName: testStringVal, passWord: testStringVal, nickName: testStringVal, tel: testStringVal, email: testEmailVal }],
  },

  dataJsonBody: {
    ...JsonBody,
    data: { id: testIntVal, userGuid: testStringVal, userName: testStringVal, passWord: testStringVal, nickName: testStringVal, tel: testStringVal, email: testEmailVal },
  },

  indexJsonBody: {
    ...JsonBody,
    data: "操作成功",
  }
};

