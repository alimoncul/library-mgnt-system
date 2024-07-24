import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface BookAttributes {
    id: number;
    name: string;
    averageRating: number;
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id' | 'averageRating'> { }

export default (sequelize: Sequelize) => {
    class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
        public id!: number;
        public name!: string;
        public averageRating!: number;
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;
    }

    Book.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        averageRating: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
    }, {
        sequelize,
        modelName: 'Book',
    });

    return Book;
}