<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
    //return $request->user();
//});

Route::group(['namespace' => 'API', 'middleware'=>['cors']], function () {
    Route::post('auth/login', 'AuthController@login');
});

Route::group(['namespace' => 'API', 'middleware'=>['cors', 'api']], function () {
    Route::get('auth/logout', 'AuthController@logout');
    Route::get('auth/refresh', 'AuthController@refresh');
    Route::get('auth/user', 'AuthController@me');
});

// Optional: Disable authentication in development
//Route::group(['middleware' => ['api', 'cors']], function () {
Route::group(['middleware' => ['api', 'cors']], function () {
    //  Historian Tag
    Route::prefix('historian-tag')->group(function () {
        Route::get('index', 'API\HistorianTagController@index');
        Route::get('all', 'API\HistorianTagController@all');
        Route::get('listdata', 'API\HistorianTagController@listWithData');
        Route::get('show/{id}', 'API\HistorianTagController@show');
        Route::get('load', 'API\HistorianTagController@load');
        Route::post('show-many', 'API\HistorianTagController@showMany');
        Route::post('store', 'API\HistorianTagController@store');
        Route::post('update/{id}', 'API\HistorianTagController@update');
        Route::delete('destroy/{id}', 'API\HistorianTagController@destroy');
    });
    
    // Historian Data
    Route::prefix('historian-data')->group(function () {
        Route::post('current-data', 'API\HistorianDataController@currentData');
        Route::post('raw-data', 'API\HistorianDataController@rawData');//原始数据
        Route::post('sampled-data', 'API\HistorianDataController@sampledData');
        Route::post('watch-data', 'API\HistorianDataController@watchData'); //监控数据
    });
});
