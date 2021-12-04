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
      await sequelize.sync({force:true});
      // await sequelize.sync({alter:true})
      // await db.motive.sync({force:true});
      return db;
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

export default data;
