export default class Models {
    static async UserModel(Sequelize,sequelize) {
        return sequelize.define("user", {
            user_id:{
                type:Sequelize.DataTypes.UUID,
                defaultValue:Sequelize.UUIDV4,
                primaryKey:true
            },
            user_name:{
                type:Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            isActive:{
                type:Sequelize.DataTypes.BOOLEAN,
                defaultValue:false,
                allowNull:false
            },
            user_lastName:{
                type: Sequelize.DataTypes.STRING(100),
                allowNull: false,
            },
            user_phone:{
                type: Sequelize.DataTypes.STRING(13),
                allowNull:false,
                is: /^9989[012345789][0-9]{7}$/,
                unique: true
            },
            user_role: {
                type: Sequelize.DataTypes.ENUM,
                values: ["superadmin","admin","sponsor","student",],
                allowNull: false,
                defaultValue: "student"
            },
            user_password:{
                type: Sequelize.DataTypes.STRING, 
                allowNull: false,
            }
        })
    }

    static async attemptsModel(Sequelize,sequelize) {
        return sequelize.define("attempts",{
            id:{
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4()
            },
            code:{
                type: Sequelize.DataTypes.STRING(6),
                allowNull: false
            },
        })
    }

    static async userMotivation(Sequelize,sequelize) {
        return sequelize.define("motivation", {
            id:{
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4()
            },
            text:{
                type: Sequelize.DataTypes.TEXT(),
                allowNull: false
            },
        })
    }

}