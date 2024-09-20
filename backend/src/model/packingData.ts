import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';
import Customer from './customer';

// Define the PackingData attributes type
type PackingDataAttributes = {
    id: number;
    top: string;
    size: number;
    length: number;
    width: number;
    height: number;
    quantity: number;
    colorCode: string;
    material: string;
    calculation1: number;
    calculation2: number;
    customerId: number;
}

// Define the optional attributes for creation (excluding id)
type PackingDataCreationAttributes = Optional<PackingDataAttributes, 'id'>

// Create the PackingData model
class PackingData extends Model<PackingDataAttributes, PackingDataCreationAttributes> implements PackingDataAttributes {
    public id!: number;
    public top!: string;
    public size!: number;
    public length!: number;
    public width!: number;
    public height!: number;
    public quantity!: number;
    public colorCode!: string;
    public material!: string;
    public calculation1!: number;
    public calculation2!: number;
    public customerId!: number;
}

// Initialize the model
PackingData.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        top: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        length: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        colorCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        material: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        calculation1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        calculation2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        customerId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Customer,  // Reference the Customer model
                key: 'id',
            },
            onDelete: 'CASCADE',  // When a customer is deleted, delete packing data as well
            onUpdate: 'CASCADE',  // When the customer ID is updated, update the packing data
        },
    },
    {
        sequelize,
        tableName: 'packingData',
    }
);

// Define the relationship with Customer
PackingData.belongsTo(Customer, { foreignKey: 'id' });

export default PackingData;
