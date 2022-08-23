<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWeighbridgeFormatYongqiang2Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('weighbridge_format_yongqiang2', function (Blueprint $table) {
            $table->id();
            $table->string('product', 30)->nullable()->comment('原始货物名称');
            $table->datetime('grossdatetime')->nullable()->comment('毛重时间');
            $table->datetime('taredatetime')->nullable()->comment('皮重时间');
            $table->unsignedSmallInteger('net')->nullable()->comment('净重，单位KG');
            $table->integer('garbage_standard_name_id')->nullable()->comment('表garbage_standard_name主键');
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
        Schema::dropIfExists('weighbridge_format_yongqiang2');
    }
}
