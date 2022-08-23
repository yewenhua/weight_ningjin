<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePageElementTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('page_element', function (Blueprint $table) {
            $table->id();
            $table->string('name', 30)->nullable()->comment('名称');
            $table->string('description', 50)->nullable()->comment('描述');
            $table->string('code', 50)->nullable()->comment('元素编码');
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
        Schema::dropIfExists('page_element');
    }
}
