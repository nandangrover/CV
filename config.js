const dotenv = require('dotenv')

dotenv.config();

module.exports =  {
    db: process.env.DB,
    users: process.env.ALLOWED_USERS,
};