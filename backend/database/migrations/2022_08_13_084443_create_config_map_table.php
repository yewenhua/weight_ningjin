<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConfigMapTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('config_historian_db', function (Blueprint $table) {
            $table->id();
            $table->string('user', 30)->nullable()->comment('用户名');
            $table->string('password', 50)->nullable()->comment('密码');
            $table->string('ip', 30)->nullable()->comment('IP地址');
            $table->integer('port')->nullable()->comment('端口');
            $table->integer('version')->nullable()->comment('版本');
            $table->string('factory', 30)->nullable()->comment('所属厂引文全拼');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('config_garbage_db', function (Blueprint $table) {
            $table->id();
            $table->string('user', 30)->nullable()->comment('用户名');
            $table->string('password', 50)->nullable()->comment('密码');
            $table->string('ip', 30)->nullable()->comment('IP地址');
            $table->integer('port')->nullable()->comment('端口');
            $table->string('db_name', 30)->nullable()->comment('数据库名称');
            $table->string('factory', 30)->nullable()->comment('所属厂引文全拼');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('config_electricity_db', function (Blueprint $table) {
            $table->id();
            $table->string('master_ip', 30)->nullable()->comment('用户名');
            $table->string('slave_ip', 50)->nullable()->comment('密码');
            $table->string('common_addr', 30)->nullable()->comment('公共地址');
            $table->string('factory', 30)->nullable()->comment('所属厂引文全拼');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('dcs_map', function (Blueprint $table) {
            $table->id();
            $table->string('tag_ids', 30)->nullable()->comment('tag主键列表，英文逗号分开');
            $table->string('en_name', 50)->nullable()->comment('英文名称');
            $table->string('cn_name', 30)->nullable()->comment('中文名称');
            $table->string('func', 200)->nullable()->comment('函数');
            $table->string('factory', 30)->nullable()->comment('所属厂引文全拼');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('electricity_map', function (Blueprint $table) {
            $table->id();
            $table->string('addr', 30)->nullable()->comment('点位地址');
            $table->string('cn_name', 30)->nullable()->comment('中文名称');
            $table->string('func', 200)->nullable()->comment('函数');
            $table->string('factory', 30)->nullable()->comment('所属厂引文全拼');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('weighbridge_map', function (Blueprint $table) {
            $table->id();
            $table->integer('cate_big_id')->nullable()->comment('weighbridge_cate_big表主键');
            $table->integer('cate_small_id')->nullable()->comment('weighbridge_cate_small表主键');
            $table->timestamps();
        });

        Schema::create('weighbridge_cate_big', function (Blueprint $table) {
            $table->id();
            $table->string('name', 30)->nullable()->comment('名称');
            $table->string('description', 30)->nullable()->comment('描述');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('weighbridge_cate_small', function (Blueprint $table) {
            $table->id();
            $table->string('name', 30)->nullable()->comment('名称');
            $table->string('description', 30)->nullable()->comment('描述');
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
        Schema::dropIfExists('config_historian_db');
        Schema::dropIfExists('config_garbage_db');
        Schema::dropIfExists('config_electricity_db');
        Schema::dropIfExists('dcs_map');
        Schema::dropIfExists('electricity_map');
        Schema::dropIfExists('weighbridge_map');
        Schema::dropIfExists('weighbridge_cate_big');
        Schema::dropIfExists('weighbridge_cate_small');
    }
}
