<?php

namespace App\Http\Controllers;

use App\Data\CreateDependantData;
use App\Data\DependantData;
use App\Data\UpdateDependantData;
use App\Models\Dependant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
        list('name' => $name, 'is_active' => $is_active, 'contacts' => $contacts, 'rates' => $rates, 'schedules' => $schedules) = $data;

        DB::beginTransaction();

        try {
            /** @var Dependant */
            $dependant = Dependant::create([
                'user_id' => Auth::id(),
                'name' => $name,
                'is_active' => $is_active,
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
        return Inertia::render('EditDependant', [
            'dependant' => $dependant->with(['contacts', 'rates', 'schedules'])->get()->first(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDependantData $request, Dependant $dependant)
    {
        Log::info($request->all());

        dd(UpdateDependantData::getValidationRules($request->toArray()));

        return redirect('/manage-dependants');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dependant $dependant)
    {
        //
    }
}
