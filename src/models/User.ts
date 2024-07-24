import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import Book from './Book';
import BorrowedBook from './BorrowedBook';

interface UserAttributes {
    id: number;
    name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export default (sequelize: Sequelize) => {
    class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
        public id!: number;
        public name!: string;
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;
    }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
}
