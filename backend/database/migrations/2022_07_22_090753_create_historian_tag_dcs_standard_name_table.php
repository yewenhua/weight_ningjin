<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistorianTagDcsStandardNameTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historian_standard_yongqiang2', function (Blueprint $table) {
            $table->id();
            $table->integer('historian_tag_id')->nullable()->comment('表historian_tag_yongqiang2主键');
            $table->integer('dcs_standard_name_id')->nullable()->comment('表dcs_standard_name主键');
            $table->string('func', 100)->nullable()->comment('取值函数');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('historian_tag_dcs_standard_name');
    }
}
