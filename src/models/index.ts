import sequelize from '../config/database';
import UserModel from './User';
import BookModel from './Book';
import BorrowedBookModel from './BorrowedBook';

// Initialize models
const User = UserModel(sequelize);
const Book = BookModel(sequelize);
const BorrowedBook = BorrowedBookModel(sequelize);

// Setup associations
User.belongsToMany(Book, {
    through: {
        model: BorrowedBook,
        unique: false
    },
    foreignKey: 'userId',  // Explicitly define which column to use
    otherKey: 'bookId'

});
Book.belongsToMany(User, {
    through: {
        model: BorrowedBook,
        unique: false
    },
    foreignKey: 'bookId',  // Explicitly define which column to use
    otherKey: 'userId'

});

// Export models and sequelize connection
export { User, Book, BorrowedBook, sequelize };
