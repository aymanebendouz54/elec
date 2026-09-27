<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
use App\Http\Controllers\ContactController;

use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ProjectController;


Route::post('/contact', [ContactController::class, 'send']);
Route::get('/contact-requests', [ContactController::class, 'index']);
Route::post('/contact-requests/delete/{id}', [ContactController::class, 'destroy']);
Route::post('/reviews', [ReviewController::class, 'store']);
Route::post('/reviews/delete/{id}', [ReviewController::class, 'destroy']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::post('/projects', [ProjectController::class, 'store']);
Route::post('/projects/delete/{id}', [ProjectController::class, 'destroy']);





Route::get('/status', function () {
    return response()->json(['message' => 'BendouzElec API is Live!']);
});