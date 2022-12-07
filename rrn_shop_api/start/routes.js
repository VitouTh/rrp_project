'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')



// Public route
Route.group(() => {
    Route.post('/login', 'UserController.login')
    Route.post('/register', 'UserController.register')
    Route.post('/verify', 'UserController.verify')
    Route.post('/refresh_token', 'UserController.refreshToken')
    Route.post('/forgot_password', 'UserController.forgotPassword')
    Route.post('/new_password', 'UserController.newPassword')

}).prefix('api/v1')

// Auth route
Route.group(() => {
    Route.post('/logout', 'UserController.logout')
    Route.get('/profile', 'UserController.getProfile')
    Route.put('/profile', 'UserController.updateProfile')
    Route.put('/profile/change_password', 'UserController.changePassword')

    // user
    Route.get('/user/pagination', 'UserController.pagination')
    Route.get('/user/paginationCustomer', 'UserController.paginationCustomer')
    Route.get('/user/listCustomer', 'UserController.listCustomer')
    Route.get('/user/listAdmin', 'UserController.listAdmin')
    Route.get('/user', 'UserController.list')
    Route.get('/user/:id', 'UserController.get')
    Route.post('/user', 'UserController.create')
    Route.put('/user/:id', 'UserController.update')
    Route.put('/user/status/:id', 'UserController.updateStatus')
    Route.put('/user/password/:id', 'UserController.updatePassword')
    Route.delete('/user/:id', 'UserController.delete')


    // user type
    Route.get('/user_type', 'UserTypeController.list')

    // ---product_type---
    Route.get('/product_type/pagination', 'ProductTypeController.pagination')
    Route.get('/product_type/:id', 'ProductTypeController.get')
    Route.post('/product_type', 'ProductTypeController.create')
    Route.put('/product_type/:id', 'ProductTypeController.update')
    Route.put('/product_type/status/:id', 'ProductTypeController.updateStatus')
    Route.delete('/product_type/:id', 'ProductTypeController.delete')
    Route.get('/product_type', 'ProductTypeController.list')

    // ---poster_type---
    Route.get('/poster/pagination', 'PosterController.pagination')
    Route.get('/poster/:id', 'PosterController.get')
    Route.post('/poster', 'PosterController.create')
    Route.put('/poster/:id', 'PosterController.update')
    Route.put('/poster/status/:id', 'PosterController.updateStatus')
    Route.delete('/poster/:id', 'PosterController.delete')

    // ---blog---
    Route.get('/blog/pagination', 'BlogController.pagination')
    Route.get('/blog/:id', 'BlogController.get')
    Route.post('/blog', 'BlogController.create')
    Route.put('/blog/:id', 'BlogController.update')
    Route.put('/blog/status/:id', 'BlogController.updateStatus')
    Route.delete('/blog/:id', 'BlogController.delete')

    // ---product---
    Route.get('/product/pagination', 'ProductController.pagination')
    Route.get('/product/:id', 'ProductController.get')
    Route.post('/product', 'ProductController.create')
    Route.put('/product/:id', 'ProductController.update')
    Route.put('/product/status/:id', 'ProductController.updateStatus')
    Route.put('/product/best_selling/:id', 'ProductController.updateBestSelling')
    Route.delete('/product/:id', 'ProductController.delete')
    Route.get('/product', 'ProductController.list')

    //sell
    Route.get('/sell/pagination', 'SellController.pagination')
    Route.get('/sell/:id', 'SellController.get')
    Route.post('/sell', 'SellController.create')
    Route.put('/sell/:id', 'SellController.update')
    Route.put('/sell/status/:id', 'SellController.updateStatus')
    Route.delete('/sell/:id', 'SellController.delete')

    //meeting
    Route.get('/meeting/pagination', 'MeetingController.pagination')
    Route.get('/meeting/:id', 'MeetingController.get')
    Route.post('/meeting', 'MeetingController.create')
    Route.put('/meeting/:id', 'MeetingController.update')
    Route.put('/meeting/status/:id', 'MeetingController.updateStatus')
    Route.delete('/meeting/:id', 'MeetingController.delete')


}).prefix('api/v1').middleware(['auth'])