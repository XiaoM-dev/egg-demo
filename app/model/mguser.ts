module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    userGuid: String, 
    userName: String, 
    passWord: String, 
    nickName: String, 
    tel: String, 
    email: String
  });

  return mongoose.model('MgUser', UserSchema, 'user'); 
};

