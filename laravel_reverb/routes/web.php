<?php

use App\Events\NotificationSent;
use Illuminate\Support\Facades\Route;
use Laravel\Reverb\Servers\Reverb\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/send', function (Request $request) {
    $message = 'Hallo';
    broadcast(new NotificationSent($message))->toOthers();
    return redirect('/'); // Redirect to homepage
});
