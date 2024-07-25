import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export interface BookAttributes {
    id: number;
    name: string;
    score: number;
}

export type BookDetails = {
    name: string,
    userScore?: number
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id' | 'score'> { }

export default (sequelize: Sequelize) => {
    class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
        public id!: number;
        public name!: string;
        public score!: number;
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
        score: {
            type: DataTypes.FLOAT,
            defaultValue: -1,
        },
    }, {
        sequelize,
        modelName: 'Book',
        timestamps: false
    });

    return Book;
}