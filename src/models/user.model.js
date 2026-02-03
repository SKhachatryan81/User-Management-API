import { DataTypes, Model } from "sequelize";

export default function ( sequelize )
{
    class UsersModel extends Model {
        static associate(db)
        {
            UsersModel.hasMany(db.postModel, {foreignKey: "user_id", as: "posts"});
        }
    }

    UsersModel.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        age: DataTypes.INTEGER,
        occupation: DataTypes.STRING,
        username: DataTypes.STRING,
    }, {
        tableName: "users", 
        timestamps: false,
        sequelize
    })

    return UsersModel;
}