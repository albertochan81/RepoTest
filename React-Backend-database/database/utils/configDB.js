require("dotenv").config();

const dbName = "zchvzbhb";
const dbUser = "zchvzbhb";
//const dbPwd = "EhV3J9JYgrtWhRmklGQyN-3pz_5zTGNK";
const dbPwd = process.env.PASSWORD;

module.exports = {
  dbName,
  dbUser,
  dbPwd,
};