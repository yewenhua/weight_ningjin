<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserOrgnizationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_orgnization', function (Blueprint $table) {
            $table->id();
            $table->integer('orgnization_id')->nullable()->comment('表orgnization主键');
            $table->integer('user_id')->nullable()->comment('用户表主键');
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
        Schema::dropIfExists('user_orgnization');
    }
}
