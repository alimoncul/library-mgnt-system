import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Book from './Book';

interface BorrowedBookAttributes {
    userId: number;
    bookId: number;
    rating: number | null;
    borrowedAt: Date;
    returnedAt: Date | null;
}

class BorrowedBook extends Model<BorrowedBookAttributes> implements BorrowedBookAttributes {
    public userId!: number;
    public bookId!: number;
    public rating!: number | null;
    public borrowedAt!: Date;
    public returnedAt!: Date | null;
}

BorrowedBook.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    bookId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Books',
            key: 'id',
        },
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    borrowedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    returnedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'BorrowedBook',
});

export default BorrowedBook;