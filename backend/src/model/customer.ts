import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';

// Define the Customer attributes type
type CustomerAttributes = {
    id: number;
    name: string;
    email: string;
}

// Define optional attributes for creation (excluding id)
type CustomerCreationAttributes = Optional<CustomerAttributes, 'id'>;

// Create the Customer model
class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
}

// Initialize the model
Customer.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
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
    },
    {
        sequelize,
        tableName: 'customers',
    }
);

export default Customer;
