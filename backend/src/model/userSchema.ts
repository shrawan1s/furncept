import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';

// Define the User attributes type
type UserAttributes = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    resetToken?: string;
    resetTokenExpiresAt?: Date;
}

// Define optional attributes (for fields that are optional, like resetToken)
type UserCreationAttributes = Optional<UserAttributes, 'id' | 'resetToken' | 'resetTokenExpiresAt'>;

// Create the User model by extending Sequelize's Model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public resetToken?: string;
    public resetTokenExpiresAt?: Date;
}

// Initialize the model
User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 100],
            }
        },
        resetToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        resetTokenExpiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);

export default User;
