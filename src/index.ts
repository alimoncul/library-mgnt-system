import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import borrowRoutes from './routes/borrowRoutes';
import resetRoutes from './routes/resetRoutes';
import { sequelize } from './models';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/', userRoutes);
app.use('/', bookRoutes);
app.use('/', borrowRoutes);
app.use('/', resetRoutes); // implemented for testing purposes

const initializeDatabase = async () => {
    try {
        // Sync all models with the database
        await sequelize.sync({ force: true });

        console.log('Database sync complete');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log('Error connecting to the database', error);
    }
};

initializeDatabase();

export default app;
