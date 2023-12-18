<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::paginate(10);
    }

    public function store(UserRequest $request)
    {
        $validatedData = $request->validated();

        // I had to set up a default password to make it work
        $validatedData['password'] = Hash::make('defaultPassword');

        $user = User::create($validatedData);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    public function update(UserRequest $request, User $user)
    {
        $user->update($request->validated());
        return response()->json(['message' => 'User updated successfully',
            'user' => $user]);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
