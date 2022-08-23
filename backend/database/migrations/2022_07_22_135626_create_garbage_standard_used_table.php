<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGarbageStandardUsedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('garbage_standard_used', function (Blueprint $table) {
            $table->id();
            $table->integer('garbage_standard_name_id')->nullable()->comment('表garbage_standard_name主键');
            $table->integer('garbage_used_name_id')->nullable()->comment('表garbage_used_name主键');
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
        Schema::dropIfExists('garbage_standard_used');
    }
}
