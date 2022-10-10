module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    userGuid: {type: String}, 
    userName: {type: String}, 
    passWord: {type: String}, 
    nickName: {type: String}, 
    tel: {type: String}, 
    email: {type: String}
  });

  return mongoose.model('MgUser', UserSchema, 'user'); 
};

