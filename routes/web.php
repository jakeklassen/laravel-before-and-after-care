<?php

use App\Http\Controllers\Auth;
use App\Http\Controllers\Hello;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', [Hello::class, 'index'])->middleware('auth');
Route::get('/login', [Auth::class, 'index'])->name('login');

Route::get('/auth/google/redirect', function () {
    return Socialite::driver('google')->redirect();
});

Route::get('/auth/google/callback', function () {
    $user = Socialite::driver('google')->user();
    dd($user);
});
