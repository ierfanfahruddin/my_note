<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;

if (! function_exists('apiResponse')) {
    /**
     * Generate a consistent API response.
     *
     * @param bool $success
     * @param string|null $message
     * @param array|object|null $data
     * @param int $statusCode
     * @param array $headers
     * @return JsonResponse
     */
    function apiResponse(bool $success, ?string $message = null, $data = null, int $statusCode = 200, array $headers = []): JsonResponse
    {
        $response = [
            'success' => $success,
            'message' => $message,
        ];

        if ($data !== null) {
            $response['data'] = $data;
        }

        return response()->json($response, $statusCode, $headers);
    }
}