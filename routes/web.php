<?php

use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/todo-app', function () {
    return Inertia::render('TodoApp');
})->middleware(['auth', 'verified'])->name('todo-app');
require __DIR__.'/auth.php';

Route::controller(TaskController::class)->group(function () {
    Route::get('/tasks/{id}', 'show')->name('get-task');
    Route::get('/tasks', 'index')->name('get-tasks');
    Route::post('/tasks', 'store')->name('save-task');
    Route::put('/tasks/{id}', 'update')->name('update-task');
    Route::delete('/tasks/{id}', 'destroy')->name('delete-task');
});
