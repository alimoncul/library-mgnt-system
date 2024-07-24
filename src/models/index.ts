import sequelize from '../config/database';
import UserModel from './User';
import BookModel from './Book';
import BorrowedBookModel from './BorrowedBook';

// Initialize models
const User = UserModel(sequelize);
const Book = BookModel(sequelize);
const BorrowedBook = BorrowedBookModel(sequelize);

User.belongsToMany(Book, {
    through: BorrowedBook,
    as: 'BorrowedBooks',
    foreignKey: 'userId',
    otherKey: 'bookId'
});

Book.belongsToMany(User, {
    through: BorrowedBook,
    as: 'Borrowers',
    foreignKey: 'bookId',
    otherKey: 'userId'
});


// Export models and sequelize connection
export { User, Book, BorrowedBook, sequelize };
