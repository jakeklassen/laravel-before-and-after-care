<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class Hello extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome');
    }
}
