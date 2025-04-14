<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

use function App\Helpers\apiCreated;
use function App\Helpers\apiUpdated;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        return apiCreated(function () use ($validated) {
            return User::create([
                ...$validated,
                'password' => Hash::make($validated['password']),
            ]);
        }, 'Pengguna berhasil dibuat.', 'users.show', ['user' => function ($user) {
            return $user->id;
        }]);
    }

    public function show(User $user)
    {
        return response()->json($user);
    }
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|min:6',
        ]);
    
        return apiUpdated(function () use ($validated, $user) {
            if (isset($validated['password'])) {
                $validated['password'] = Hash::make($validated['password']);
            }
            
            $user->update($validated);
            return $user;
        }, 'Pengguna berhasil diperbarui.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }
}
