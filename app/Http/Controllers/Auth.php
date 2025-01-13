<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class Auth extends Controller
{
    public function index()
    {
        return Inertia::render('Login');
    }
}
