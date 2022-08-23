<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoleOrgnizationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('role_orgnization', function (Blueprint $table) {
            $table->id();
            $table->integer('orgnization_id')->nullable()->comment('表orgnization主键');
            $table->integer('role_id')->nullable()->comment('角色表主键');
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
        Schema::dropIfExists('role_orgnization');
    }
}
