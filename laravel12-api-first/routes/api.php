<?php

use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->apiResource('users', UserController::class);

Route::post('login', [App\Http\Controllers\API\AuthController::class, 'login']);