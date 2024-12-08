const 
    express =require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    authRoutes = require('./routes/auth.route'),
    taskRoutes = require('./routes/tasks.route'),
    PORT = 3000,
    app = express();

    require('dotenv').config();

    const DB_URL = 'mongodb://localhost:27017/todolist';
    const mongoose = require('mongoose');
    mongoose
        .connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => {
            console.error('Database connection failed:', error.message);
            process.exit(1); 
        });
app.use(express.json()); 
app.use('/api/user', authRoutes);
app.use('/api/task', taskRoutes);

        
app.listen(  PORT , ()=> {
    console.log(`Server is running on port ${PORT}`);
});





