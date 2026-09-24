import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from "@/HelloWorld.vue";
import VueRouter from "vue-router";
import IndexView from "@/views/IndexView.vue";
import ShopCart from "@/views/cart/ShopCart.vue";
import Freeca from "@/views/freeca/Freeca.vue";
import PersonCenter from "@/views/mine/PersonCenter.vue";
import OrderInfo from "@/views/order/OrderInfo.vue";
import OrderDetail from "@/views/order/OrderDetail.vue";
import Classification from "@/views/classification/Classification.vue";
import ProductList from "@/views/product/ProductList.vue";
import ProductDetail from "@/views/product/ProductDetail.vue";
import ConfirmOrder from "@/views/order/ConfirmOrder.vue";
import AddressManagement from "@/views/mine/AddressManagement.vue";
import AddAdress from "@/views/mine/AddAdress.vue";
import Setting from "@/views/mine/Setting.vue";
import CityList from "@/views/city/CityList.vue";
import FlashSale from "@/views/product/FlashSale.vue";
import HotProduct from "@/views/product/HotProduct.vue";
import QuickLogin from "@/views/login/QuickLogin.vue";
import Login from "@/views/login/Login.vue";
import DirectCharge from "@/views/service/DirectCharge.vue";
import NewProduct from "@/views/product/NewProduct.vue";
import SelectBrand from "@/views/product/SelectBrand.vue";
import UserGuide from "@/views/mine/UserGuide.vue";
import ActivityZone from "@/views/product/ActivityZone.vue";
import orderOrderDetail from "@/views/order/orderOrderDetail.vue";
import ProductDescription from "@/views/mine/ProductDescription.vue";
import Festivals from "@/views/product/Festivals.vue";

Vue.use(Router)


const routes = [
    {
        path: '',
        redirect: "/quickLogin"
    },
    {
        path: '/helloWord',
        component: HelloWorld,
        meta: {
            title: 'helloWord'
        }
    }, {
        path: '/index',
        component: IndexView,
        meta: {
            title: '首页',
            keepAlive:true,
            keep:true,
            active:0
        }
    }, {
        path: '/classification',
        component: Classification,
        meta: {
            title: '分类',
            keepAlive:true,
            keep:true,
            active:1
        }
    }, {
        path: '/shopCart',
        component: ShopCart,
        meta: {
            title: '购物车'
        }
    }, {
        path: '/freeca',
        component: Freeca,
        meta: {
            title: '尊享券'
        }
    }, {
        path: '/mine',
        component: PersonCenter,
        meta: {
            title: '我的',
            keepAlive:true,
            keep:true,
            active:4
        }
    },{
        path: '/festivals',
        component: Festivals,
        meta: {
            title: '',
            keepAlive:true,
            keep:true,
        }
    }, {
        path: '/orderDetail',
        component: OrderDetail,
        meta: {
            title: '订单详情'
        }
    }, {
        path: '/productList',
        component: ProductList,
        meta: {
            title: '商品',
            // keepAlive:true,
            // keep:true
        }
    }, {
        path: '/productDetail',
        component: ProductDetail,
        meta: {
            title: '商品详情'
        }
    }, {
        path: '/confirmOrder',
        component: ConfirmOrder,
        meta: {
            title: '确认订单'
        }
    }, {
        path: '/orderInfo',
        component: OrderInfo,
        meta: {
            title: '订单'
        }
    }, {
        path: '/address',
        component: AddressManagement,
        meta: {
            title: '地址管理'
        }
    }, {
        path: '/addAddress',
        component: AddAdress,
        meta: {
            title: '新建地址'
        }
    }, {
        path: '/setting',
        component: Setting,
        meta: {
            title: '设置'
        }
    }, {
        path: '/cityList',
        component: CityList,
        meta: {
            title: '城市'
        }
    }, {
        path: '/flashSale',
        component: FlashSale,
        meta: {
            title: '特卖专区'
        }
    }, {
        path: '/hotProduct',
        component: HotProduct,
        meta: {
            title: '热门商品'
        }
    },{
        path: '/quickLogin',
        component: QuickLogin,
        meta: {
            title: '快捷登录'
        }
    },{
        path: '/login',
        component: Login,
        meta: {
            title: '登录'
        }
    },{
        path: '/directCharge',
        component: DirectCharge,
        meta: {
            title: '卡券详情'
        }
    },{
        path: '/newProduct',
        component: NewProduct,
        meta: {
            title: '新品专区'
        }
    },{
        path: '/selectBrand',
        component: SelectBrand,
        meta: {
            title: '甄选品牌'
        }
    },{
        path: '/userGuide',
        component: UserGuide,
        meta: {
            title: '使用指南'
        }
    },{
        path: '/activityZone',
        component: ActivityZone,
        meta: {
            title: '活动专区'
        }
    },{
        path: '/orderOrderDetail',
        component: orderOrderDetail,
        meta: {
            title: '订单详情'
        }
    },{
        path: '/productDescription',
        component: ProductDescription,
        meta: {
            title: '产品介绍'
        }
    },
]

const router = new Router({
    routes,
    // mode: 'history'
})
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location, onResolve, onReject) {

    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)

    return originalPush.call(this, location).catch(err => err)

}
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if(to.path=="/productDetail"){
//
//     document.body.scrollTop = 0
//
// // firefox
//
//     document.documentElement.scrollTop = 0
//
// // safari
//
//     window.pageYOffset = 0
    }

    next()
})

export default router