<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Gate;
use UtilService;
use JWTAuth;

class CheckPermission
{
    const AJAX_NO_AUTH = 99999;

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request);
    }
}
