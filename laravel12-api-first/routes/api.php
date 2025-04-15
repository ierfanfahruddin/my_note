<?php

use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

Route::apiResource('users', UserController::class);

Route::post('login', [App\Http\Controllers\API\AuthController::class, 'login']);