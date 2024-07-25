import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { BookAttributes } from './Book';

export interface UserAttributes {
    id: number;
    name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes> {
    BorrowedBooks?: Array<BookAttributes & { BorrowedBook: { borrowedAt: Date; returnedAt: Date | null; rating: number | null; } }>;
}

export default (sequelize: Sequelize) => {
    class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
        public id!: number;
        public name!: string;
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
        timestamps: false
    });

    return User;
}
