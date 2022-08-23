<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHistorianTagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historian_tag', function (Blueprint $table) {
            $table->increments('id');
            $table->string('tag_id', 50)->index()->comment('tag id');
            $table->string('tag_name', 150)->index()->comment('historian中的标签名');
            $table->string('description', 50)->nullable()->comment('描述');
            $table->string('alias', 50)->nullable()->index()->comment('别名');
            $table->string('measure', 32)->nullable()->comment('量程');
            $table->float('upper_limit')->nullable()->comment('上限');
            $table->float('lower_limit')->nullable()->comment('下限');
            $table->string('factory', 30)->nullable()->index()->comment('电厂');
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
        Schema::dropIfExists('historian_tag');
    }
}
