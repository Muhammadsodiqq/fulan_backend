import {Sequelize} from "sequelize";
import dotenv from "dotenv";
import Models from "./model.js"
dotenv.config();

const sequelize = new Sequelize(process.env.DB_STRING, {
  logging: true,
  define: {
    freezeTableName: true,
  },
});


async function data() {
    try {
      let db = {};

      db.users = await Models.UserModel(Sequelize,sequelize);
      db.attempts = await Models.attemptsModel(Sequelize,sequelize);
      db.motive = await Models.userMotivation(Sequelize,sequelize);
      db.file = await Models.userFileModel(Sequelize,sequelize)
      await db.users.hasMany(db.attempts, {
        foreignKey:{
          name:"user_id",
          allowNull:true
        }
      })

      await db.attempts.belongsTo(db.users,{
        foreignKey:{
          name:"user_id",
          allowNull:false
        }
      })

      await db.users.hasMany(db.motive, {
        foreignKey:{
          name:"user_id",
          allowNull:true
        }
      })

      await db.motive.belongsTo(db.users,{
        foreignKey:{
          name:"user_id",
          allowNull:false
        }
      })

      await db.users.hasMany(db.file, {
        foreignKey:{
          name:"user_id",
          allowNull:true
        }
      })

      await db.file.belongsTo(db.users,{
        foreignKey:{
          name:"user_id",
          allowNull:false
        }
      })

      // let user = await db.users.update({
      //   user_role:"sponsor"
      // },{
      //   where:{
      //     user_phone:"998935921808"
      //   }
      // })
      // console.log(user);
      // let user = await db.users.findAll()
      // console.log(user);
      // await sequelize.sync({force:true});
      // await sequelize.sync({alter:true})
      // await db.file.sync({force:true});
      return db;
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

export default data;
