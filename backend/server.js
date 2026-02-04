
let app = require('./src/app');
require('dotenv').config();
let connecttoDB = require('./src/config/database');
connecttoDB();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});