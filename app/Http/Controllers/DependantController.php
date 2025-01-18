<?php

namespace App\Http\Controllers;

use App\Data\CreateDependantData;
use App\Data\DependantData;
use App\Models\Dependant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DependantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        /** @var User */
        $user = Auth::user();

        $dependants = DependantData::collect(
            Dependant::query()
                ->where('user_id', $user->getKey())
                ->with(['schedules', 'rates'])
                ->get()
        );

        return Inertia::render('ManageDependants', [
            'dependants' => fn() => $dependants,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('AddDependant');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateDependantData $request)
    {
        $data = $request->toArray();
        list('contacts' => $contacts, 'rates' => $rates, 'schedules' => $schedules) = $data;

        DB::beginTransaction();

        try {
            $dependant = Dependant::create([
                'user_id' => Auth::id(),
                'name' => $data['name'],
                'is_active' => $data['is_active'],
            ]);

            $dependant->contacts()->createMany($contacts);
            $dependant->rates()->createMany($rates);
            $dependant->schedules()->createMany($schedules);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return redirect('/manage-dependants');
    }

    /**
     * Display the specified resource.
     */
    public function show(Dependant $dependant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dependant $dependant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dependant $dependant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dependant $dependant)
    {
        //
    }
}
