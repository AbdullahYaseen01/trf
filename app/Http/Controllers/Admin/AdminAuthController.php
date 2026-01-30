<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use SMD\Common\ReservationSystem\Enums\RoleType;
use App\RsUser;

class AdminAuthController extends Controller
{
    /**
     * Show admin login form
     */
    public function showLoginForm()
    {
        if (Auth::check() && Auth::user()->role_id === RoleType::ADMIN) {
            return redirect()->route('admin.dashboard');
        }
        
        return view('admin.login');
    }

    /**
     * Handle admin login
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Find user by email
        $user = RsUser::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return back()->withErrors([
                'email' => 'Invalid credentials provided.',
            ])->withInput();
        }

        // Check if user is admin
        if ($user->role_id !== RoleType::ADMIN) {
            return back()->withErrors([
                'email' => 'Access denied. Admin privileges required.',
            ])->withInput();
        }

        // Check if user is activated
        if (!$user->activated) {
            return back()->withErrors([
                'email' => 'Your account is not activated.',
            ])->withInput();
        }

        // Login the user
        Auth::login($user, $request->filled('remember'));

        return redirect()->intended(route('admin.dashboard'));
    }

    /**
     * Handle admin logout
     */
    public function logout()
    {
        Auth::logout();
        return redirect()->route('admin.login')->with('success', 'You have been logged out successfully.');
    }
}