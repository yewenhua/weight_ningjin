import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import axios from './utils/interceptor';
import { checkToken } from './utils/checkToken';
import { Message, Notification, MessageBox } from 'element-ui';
import request from './config/request';
import 'iview/dist/styles/iview.css';

Vue.prototype.$request = request;
Vue.prototype.showMessage = function(msg, type='warning', time=3000){
    Message({
        message: msg,
        type: type,
        duration: time
    });
}

Vue.prototype.showNotification = function(title, msg, type='info', time=3000){
    Notification({
        title: title,
        message: msg,
        type: type,
        duration: time
    });
}

Vue.prototype.showMessageBox = function(type, title, content, cb){
    if(type == 'alert'){
        MessageBox.alert(content, title, {
            confirmButtonText: '确定',
            callback: action => {
                cb(action);
            }
        });
    }
    else if(type == 'confirm'){
        MessageBox.confirm(content, title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            cb();
        }).catch(() => {

        });
    }
    else if(type == 'prompt'){
        MessageBox.prompt(content, title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        }).then(({ value }) => {
            cb(value);
        }).catch(() => {

        });
    }
}

Vue.prototype.ajax = function (options) {
    if(options.hasOwnProperty('noauth') && options.noauth) {
        ajax(options);
    }
    else{
        checkToken(()=>{
            ajax(options);
        });
    }
}

function ajax(options){
    let successCallback = options.success || new Function();
    let failCallback = options.fail || new Function();

    axios({
        method: options.method || 'GET',
        url: options.url,
        data: options.data || {},
        params: options.params || {},
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(function (response) {
        let status = response.status;
        let resultBean = response.data;
        if (status != 200 || resultBean.code != 0) {
            Message({
                message: resultBean.message || resultBean.msg,
                type: 'warning',
                onClose: failCallback
            });
        }
        else {
            successCallback(resultBean.data);
        }
    }).catch(function (err) {
        let msg;
        if(err && err.code == 99999){
            msg = err.message;
        }
        else{
            msg = '请求异常';
        }

        Message({
            message: msg,
            type: 'warning'
        });
        failCallback();
    });
}

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
