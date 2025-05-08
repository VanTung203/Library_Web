const BookRoute = require('./BookRoute');
const UserRoute = require('./UserRoutes');
const AdminRoute = require('./AdminRoutes');

function route(app) {
    app.post('/api/addBook', BookRoute);
    app.get('/api/books', BookRoute);
    app.post('/api/deletebook', BookRoute);
    app.post('/api/editbook', BookRoute);
    app.get('/api/search', BookRoute);
    app.post('/api/extendsbook', BookRoute);

    // user
    app.post('/api/register', UserRoute);
    app.post('/api/login', UserRoute);
    app.post('/api/handleCart', UserRoute);
    app.get('/api/getcart', UserRoute);
    app.post('/api/requestbookuser', UserRoute);
    app.get('/api/datareqbook', UserRoute);
    app.post('/api/logout', UserRoute);
    app.post('/api/changepass', UserRoute);
    app.post('/api/changeemail', UserRoute);
    app.get('/api/searchuser', UserRoute);
    app.get('/api/searchuser2', UserRoute);

    //admin
    app.get('/api/getalluser', AdminRoute);
    app.post('/api/edituser', AdminRoute);
    app.post('/api/deleteuser', AdminRoute);
    app.post('/api/editcart', AdminRoute);
    app.get('/api/datacart', AdminRoute);
    app.post('/api/editdatacart', AdminRoute);
    app.post('/api/thuthe', AdminRoute);
    app.post('/api/returncart', AdminRoute);

    // Book
    app.post('/api/requestbook', BookRoute);
    app.post('/api/deletebooks', BookRoute);
}

module.exports = route;
