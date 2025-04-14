<?php

namespace App\Helpers;

use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Throwable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;

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

if (! function_exists('apiCreated')) {
    /**
     * Handle resource creation with try-catch and consistent API response.
     *
     * @param callable $creationCallback Callback function to execute the creation logic.
     * Should return the created resource on success.
     * @param string $successMessage Message to return on successful creation.
     * @param string|null $locationRouteName Optional route name for the Location header.
     * @param array $locationRouteParams Optional parameters for the Location route.
     * @return JsonResponse
     */
    function apiCreated(callable $creationCallback, string $successMessage, ?string $locationRouteName = null, array $locationRouteParams = []): JsonResponse
    {
        DB::beginTransaction();
        try {
            $resource = $creationCallback();
            DB::commit();

            $response = apiResponse(true, $successMessage, $resource, 201);

            if ($locationRouteName) {
                // Process route parameters that might contain callbacks
                $processedParams = [];
                foreach ($locationRouteParams as $key => $param) {
                    if (is_callable($param) && !is_string($param)) {
                        $processedParams[$key] = $param($resource);
                    } else {
                        $processedParams[$key] = $param;
                    }
                }
                
                $response->header('Location', URL::route($locationRouteName, $processedParams));
            }

            return $response;

        } catch (QueryException $e) {
            DB::rollBack();
            return apiResponse(false, 'Gagal membuat sumber daya karena kesalahan database.', null, 500);
        } catch (Throwable $e) {
            DB::rollBack();
            return apiResponse(false, 'Terjadi kesalahan server saat membuat sumber daya.', null, 500);
        }
    }
}


if (! function_exists('apiUpdated')) {
    /**
     * Handle resource update with try-catch and consistent API response.
     *
     * @param callable $updateCallback Callback function to execute the update logic.
     * Should return the updated resource on success.
     * @param string $successMessage Message to return on successful update.
     * @return JsonResponse
     */
    function apiUpdated(callable $updateCallback, string $successMessage): JsonResponse
    {
        DB::beginTransaction();
        try {
            $resource = $updateCallback();
            DB::commit();

            return apiResponse(true, $successMessage, $resource, 200);

        } catch (QueryException $e) {
            DB::rollBack();
            return apiResponse(false, 'Gagal memperbarui sumber daya karena kesalahan database.', null, 500);
        } catch (Throwable $e) {
            DB::rollBack();
            return apiResponse(false, 'Terjadi kesalahan server saat memperbarui sumber daya.', null, 500);
        }
    }
}