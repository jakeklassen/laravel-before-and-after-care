<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Attendance::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'dependant_id' => ['required', 'exists:dependants,id'],
            'date' => ['required', 'date'],
            'status' => ['required', 'in:present,absent'],
            'when' => ['required', 'in:am,pm,day'],
            // ID is nullable for create, required for update
            'id' => ['nullable', 'exists:dependant_attendance,id'],
        ]);

        $attendance = null;

        if (isset($data['id'])) {
            $attendance = Attendance::find($data['id']);

            if (!$attendance) {
                abort(404, 'Attendance record not found.');
            }

            $attendance->update($data);
        } else {
            Attendance::create($data);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        Log::info('Attendance deleted', ['attendance' => $attendance]);
        $attendance->delete();
    }
}
