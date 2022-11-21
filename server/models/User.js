var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: {type: String},
    gender: {type: String},
  },
  { timestamps: true }
);

// Hashing The Password
userSchema.pre("save", async function (next) {
  try {
    if (this.password && this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.createPassword =  async function (password){
  try {
   
      this.password = await bcrypt.hash(this.password, 10);
      return this.password;
    
   

  } catch (error){
    return next(error)
  }
}

//Method For Verification Of Password
userSchema.methods.verifyPassword = async function (password) {
  try {
    let result = await bcrypt.compare(password, this.password);
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};



// Method For Signing The Token
userSchema.methods.signToken = async function () {
  let payload = {
    userId: this.id,
    email: this.email,
    username: this.username,
    name: this.name,
  };
  try {
    let token = await jwt.sign(payload, process.env.JWTSECRET);
    return token;
  } catch (error) {
    return error;
  }
};

// Method To Display User
userSchema.methods.userProfile = function () {
  return {
    name: this.name,
    
    gender: this.gender,
   
    bio: this.bio,
    email: this.email,
    token: token,
  };
};

// Method To Make UserJSON
userSchema.methods.userJSON = function (token) {
  return {
    name: this.name,
    email: this.email,
    token: token,
  };
};

module.exports = mongoose.model("User", userSchema);
