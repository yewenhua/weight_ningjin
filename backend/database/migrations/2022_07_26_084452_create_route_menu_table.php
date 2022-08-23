<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRouteMenuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('route_menu', function (Blueprint $table) {
            $table->id();
            $table->string('name', 30)->nullable()->comment('名称');
            $table->string('description', 50)->nullable()->comment('描述');
            $table->string('url', 50)->nullable()->comment('URL路径');
            $table->integer('parent_id')->nullable()->comment('父组织ID');
            $table->integer('level')->nullable()->comment('所处层级');
            $table->integer('sort')->nullable()->comment('排序号');
            $table->string('icon', 50)->nullable()->comment('菜单图标');
            $table->string('color', 50)->nullable()->comment('菜单颜色');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('route_menu');
    }
}
