import CryptoJS from 'crypto-js';

const sign = '233f4def5c875875';

let formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n
};

let toDou = function(n) {
    return n < 10 ? '0'+n : n;
}

export function px2rem(){
    (function(doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth == 375){
                    docEl.style.fontSize = '50px';
                }
                else if(clientWidth < 450){
                    docEl.style.fontSize = 50 * (clientWidth / 375) + 'px';
                }
                else if(clientWidth < 800){
                    docEl.style.fontSize = 50 * 1.2 + 'px';
                }
                else if(clientWidth < 1200){
                    docEl.style.fontSize = 50 * 1.5 + 'px';
                }
                else if(clientWidth < 1600){
                    docEl.style.fontSize = 50 * 1.8 + 'px';
                }
                else{
                    docEl.style.fontSize = 50 * 2 + 'px';
                }
            };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
}

export function unixtimefromat(timestamp){
    var dataObj = new Date();
    dataObj.setTime(timestamp);
    var year = dataObj.getFullYear();
    var month = dataObj.getMonth() + 1;
    var monthstr = month < 10 ? ('0' + month) : month;
    var day = dataObj.getDate();
    var daystr = day < 10 ? ('0' + day) : day;
    var hour = dataObj.getHours();
    var hourstr = hour < 10 ? ('0' + hour) : hour;
    var min = dataObj.getMinutes();
    var minstr = min < 10 ? ('0' + min) : min;
    var sec = dataObj.getSeconds();
    var secstr = sec < 10 ? ('0' + sec) : sec;
    var zh_short_date = monthstr + '???' + daystr + '???';
    var hour_min = hourstr + ':' + minstr;
    var fullstr = year + '-' + monthstr + '-' + daystr + ' ' + hourstr + ':' + minstr + ':' + secstr;
    var date = year + '-' + monthstr + '-' + daystr;

    return {
        year: year,
        month: monthstr,
        day: daystr,
        hour: hourstr,
        int_hour: hour,
        min: minstr,
        sec: secstr,
        zh_short_date: zh_short_date,
        hour_min: hour_min,
        all: fullstr,
        date: date
    };
}

export function formatDate(date) {
    const year = date.getFullYear();
    const month = formatNumber(date.getMonth() + 1);
    const day = formatNumber(date.getDate());
    const hour = formatNumber(date.getHours());
    const minute = formatNumber(date.getMinutes());
    return year + "-" + month + "-" + day + " " + hour + ":" + minute;
};

export function aesencode(str){
    const key  = CryptoJS.enc.Latin1.parse(sign);
    const iv   = CryptoJS.enc.Latin1.parse(sign);

    var newstr = JSON.stringify(str);
    var ciphertext = CryptoJS.AES.encrypt(newstr, key, {
        iv:iv,
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.ZeroPadding
    });
    var encryptStr = ciphertext.toString();

    return encryptStr;
}

export function aesdecode(str){
    const key  = CryptoJS.enc.Latin1.parse(sign);
    const iv   = CryptoJS.enc.Latin1.parse(sign);

    var bytes  = CryptoJS.AES.decrypt(str, key,{iv:iv,padding:CryptoJS.pad.ZeroPadding});
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    var decrypetStr = JSON.parse(plaintext);

    return decrypetStr;
}

export function dateExchage(date){
    let dateStr = String(date);
    let str = dateStr.replace(/-/g, '/');
    return str;
}

export function time2date(timestamp){
    var oDate = new Date();
    oDate.setTime(timestamp);
    var str = oDate.getFullYear() + '-' + toDou(oDate.getMonth() + 1) + '-' + toDou(oDate.getDate()) + ' ' + toDou(oDate.getHours()) + ':' + toDou(oDate.getMinutes()) + ':' + toDou(oDate.getSeconds());
    return str;
}