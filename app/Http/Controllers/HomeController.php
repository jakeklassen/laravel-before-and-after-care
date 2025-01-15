<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        /** @var User */
        $user = Auth::user();

        return Inertia::render('Index', [
            'dependants' => fn() => $user->dependants()
                ->with(['schedules', 'rates', 'contacts'])->get(),
        ]);
    }
}
