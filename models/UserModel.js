import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /(^(\+88|0088|88)?(01){1}[3456789]{1}(\d){8})$/.test(v);
        },
        message: (prop) => `Invalid Phone Number: ${prop.value}`,
      },
      unique: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (prop) => `Invalid Email Address: ${prop.value}`,
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerify: {
      type: Boolean,
      default: false,
    },
    otp:{
      type:String,  
    },
    post: {
      type: String,
    },
    aboutMe: {
      type: String,
    },
    cv: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    birthday: {
      type: String,
    },
    address: {
      type: String,
    },
    mapLink: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    accountStatus: {
      type: String,
      enum: ["PENDING", "ACTIVE", "REJECTED"],
      default: "PENDING",
      required: true,
    },
    image: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/portfolio-66931.appspot.com/o/client-3.png?alt=media&token=4f615887-cbda-49c9-b279-194fe7b7a802",
    },
  },
  { versionKey: false, timestamps: true },)

const UserModel = mongoose.model('User', UserSchema)

export default UserModel;