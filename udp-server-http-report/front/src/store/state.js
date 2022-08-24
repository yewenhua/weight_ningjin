export default {
    //以下为公共信息
    loading: false,
    sitename: '人工智能',
    host: process.env.VUE_APP_HOST,
    baseURL: process.env.VUE_APP_BASE_URL,
    wsURL: process.env.VUE_APP_WS_URL,

    //以下为商家信息
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : '',
    token: sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')) : '',
    privileges: sessionStorage.getItem('privileges') ? JSON.parse(sessionStorage.getItem('privileges')) : '',
}
