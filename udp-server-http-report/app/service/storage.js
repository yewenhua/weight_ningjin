const Service = require('egg').Service;

class StorageService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    async insertMany(params){
        const { ctx, app } = this;
        let data_provincce = [];
        let data_city = [];
        //console.log('=====插入DCS数据======');
        //console.log(params.length);
        //return false;
        if(params && params.length > 0){
            let cfg_tags = app.config.dcsTags;
            let city_tags = app.config.cityTags;
            for(let item of params){
                let tag = item[0];
                let value = String(item[1]);
                if(value == 'None' || value == 'none' || value == '' || value == 'null' || !value){
                    //continue;
                }
                else if(value == 'false' || value == 'False'){
                    value = 0;
                }
                else if(value == 'true' || value == 'True'){
                    value = 1;
                }
                else if(value.indexOf('.') !== -1){
                    value = Number(item[1]);
                    value = value.toFixed(4);
                }
                else{
                    value = Number(value);
                }

                let time = (new Date(item[3])).getTime();
                let tagCnName, code, paramId, paramName, paramUnit, paramType;

                //循环省平台配置文件获取中文名和编码
                for(let tagItem of cfg_tags){
                    if(tag == tagItem.sourceCode){

                        tagCnName = tagItem.cnName;
                        code = tagItem.itemCode;
                        data_provincce.push({
                            tag: tag,
                            value: value,
                            datetime: time,
                            cn_name: tagCnName,
                            code: code
                        });
                        break;
                    }
                }

                //循环市平台配置文件获取中文名和编码
                for(let tagItem of city_tags){
                    if(tag == tagItem.tag){
                        paramName = tagItem.cnName;
                        paramUnit = tagItem.paramUnit;
                        paramType = tagItem.paramType;
                        paramId = tagItem.paramId;
                        data_city.push({
                            tag: tag,
                            value: value,
                            datetime: time,
                            paramId: paramId,
                            paramName: paramName,
                            paramUnit: paramUnit,
                            paramType: paramType
                        });
                        break;
                    }
                }
            }
        }

        //省平台
        if(data_provincce.length > 0){
            //console.log('=====provincce======');
            //console.log(data_provincce.length);
            await this.ctx.model.ProvinceDcs.insertMany(data_provincce);
        }

        //市平台
        if(data_city.length > 0){
            //console.log('=====city======');
            //console.log(data_city.length);
            await this.ctx.model.CityDcs.insertMany(data_city);
        }
    }
}

module.exports = StorageService;
