<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DependantController;
use App\Http\Controllers\HomeController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', [HomeController::class, 'index'])->middleware('auth');

Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/manage-dependants', [DependantController::class, 'index'])->middleware('auth');
Route::get('/add-dependant', [DependantController::class, 'create'])->middleware('auth');
Route::post('/add-dependant', [DependantController::class, 'store'])->middleware('auth');

Route::get('/auth/google/redirect', function () {
    return Socialite::driver('google')->redirect();
});

Route::get('/auth/google/callback', function () {
    /** @var \Laravel\Socialite\Two\User */
    $user = Socialite::driver('google')->user();

    $user = User::updateOrCreate([
        'google_id' => $user->id,
    ], [
        'name' => $user->name,
        'email' => $user->email,
        'google_id' => $user->id,
        'google_token' => $user->token,
        'google_refresh_token' => $user->refreshToken,
    ]);

    Auth::login($user);

    return redirect('/');
});
