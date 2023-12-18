<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FrontController extends Controller
{
    private $apiBaseUrl;

    public function __construct()
    {
        // Can't connect to Itself, must open a new server app
        $this->apiBaseUrl = config('app.url') . ':8001' . '/api';
    }

    public function getUsers(Request $request)
    {
        $queryParams = http_build_query($request->query());

        $response = Http::get("{$this->apiBaseUrl}/users?{$queryParams}");

        return $response->json();
    }

    public function createUser(Request $request)
    {
        $response = Http::post("{$this->apiBaseUrl}/users", $request->all());

        return $response->json();
    }

    public function updateUser($id, Request $request)
    {
        $response = Http::put(
            "{$this->apiBaseUrl}/users/{$id}",
            $request->all()
        );

        return $response->json();
    }

    public function deleteUser($id, Request $request)
    {
        $response = Http::delete(
            "{$this->apiBaseUrl}/users/{$id}",
            $request->all()
        );

        return $response->json();
    }
}
