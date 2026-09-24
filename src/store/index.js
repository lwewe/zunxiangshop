import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment/moment";
import 'moment/locale/zh-cn';
import {getLogo} from "@/api/mine";
moment.locale('zh-cn');
Vue.use(Vuex)

// 用来存储数据
const state = {
    appkey: "f2385fa1170d818d",
    privatekey: "71e1e4a283292c1f25ba15993a7b8f30",
    timestamp:moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),
    // baseUrl:"http://192.168.3.7/",
    // baseUrl:"https://sc.bjyxfl.com/",
    baseUrl:"http://image.bjyxfl.com/",
    baseUrl2:"https://gw.alicdn.com/tfscom/",
    imgUrl:"https://image.bjyxfl.com/upload/product/",
    token:"",
    uid:"",
    targetId:"",
    cityName:"",
    channel_no:"12358",
    freea: "http://yxfmm.bjyxfl.com/multiplex/#/securitycards?change=1&token=",
    base: "http://yxfmm.bjyxfl.com/multiplex/#",
Shopbase: "http://yxfmm.bjyxfl.com/#",
    // freea: "http://192.168.3.9:8084/#/securitycards?change=1&token=",
    // base: "http://192.168.3.9:8084/#",

    // freea: "http://192.168.1.198:8081/#/",
    // base: "http://192.168.1.198:8081/#",
    // cakeUrl:"http://yxfmm.bjyxfl.com/pastry/#",
    // bookUrl:"http://yxfmm.bjyxfl.com/book/#",
      bookUrl:"http://yxfmm.bjyxfl.com/zxbook/#",
    // perUrl:"http://yxfmm.bjyxfl.com/performance/#",
    // freea:"http://yxfmm.bjyxfl.com/fim2/#/securitycards?change=1&token=",
    // base:"http://yxfmm.bjyxfl.com/fim2/#",
    // base:"http://127.0.0.1:8081/#",
    // freea:"http://127.0.0.1:8081/#/securitycards?change=1&token=",
    kefu:"",
    film:"",
    // festivals:0//所有/1.没有电影那些按钮，分类里面没有生活服务，/2.4个板块：粮油副食     休闲食品   水果     乳饮调冲     牛奶乳品
    festivals:1
    // flag:true
}
// 响应组件中的事件
const actions = {
    // 命名可以直接后边加Action
    getUserInfoAction({commit, state}, params) {
        getLogo().then(res => {
            // console.log(res,"kefu")
            if (res.code == 200) {
                commit("changekefu",res.data.zxkf)
                localStorage.setItem("kefu",res.data.zxkf)
            }
        })
    }

}
// 操作数据
const mutations = {
    settoken(state, token) {
        state.token = token;
    },
    setuid(state, uid){
        state.uid = uid;
    },
    changeTargetId(state, uid){
        state.targetId = uid;
    },
    changeCityName(state, uid){
        state.cityName = uid;
    },
    changekefu(state, uid){
        state.kefu = uid;
    },
    changeFilm(state, uid){
        state.film = uid;
    },
}
// 用来将state数据进行加工
const getters = {}
// 新建并暴露store
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
