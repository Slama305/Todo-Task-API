const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const authSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'], 
            trim: true,
            minlength: [3, 'Name must be at least 3 characters'], 
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address',
            ], 
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'], 
        },
    },
    {
        timestamps: true,
    }
);

authSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt); 
        next();
    } catch (error) {
        next(error);
    }
});


authSchema.methods.isPasswordMatch = async function (password) {
    return bcrypt.compare(password, this.password);
}
module.exports = mongoose.model('Auth', authSchema);




// const mongoose = require('mongoose');

// const DB_URL = 'mongodb://localhost:27017/todolist';

// mongoose.connect(DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//    .then(() => console.log('Connected to MongoDB'))
//     .catch(error => console.log(error));


// let authSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }

// });

// module.exports = mongoose.model('Auth', authSchema);