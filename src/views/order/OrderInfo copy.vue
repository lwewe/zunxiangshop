<template>
  <div style="width: 100%;position: absolute;">
    <NProgress v-if="loadingflag"/>
    <div class="location">
      <ReturnBack :rcolor="'#fff'" :bcolor="'#CCCCCC'"></ReturnBack>
      <div class="tab">
        <van-tabs @click="changeType" v-model="active" title-active-color="#ED2E34" color="#F05B60"
                  title-inactive-color="#B0B0B0"
                  :line-width="15" :line-height="2">
          <van-tab title="全部"></van-tab>
          <van-tab title="待付款"></van-tab>
          <van-tab title="待收货"></van-tab>
          <van-tab title="已完成"></van-tab>
        </van-tabs>
      </div>
      <!--    列表-->
      <div v-if="orderList.length!=0">
        <OrderList :orderList="orderList"></OrderList>
        <loading v-if="isLoading"></loading>
        <!--          没有更多了-->
        <div class="none">
          <div  v-if="isScroll">--没有更多数据了--</div>
        </div>
      </div>
      <div class="noneBox" v-else>
        <div class="noneBack">
          <img class="img" src="../../assets/order/none.png" alt="">
        </div>
        <div class="noneText">您还没有订单呢~</div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderList from "@/components/OrderList.vue";
import {getOrderList} from "@/api/mine";

export default {
  name: "OrderInfo",
  components: {
    OrderList
  },
  data() {
    return {
      active: 0,
      token: "",
      orderList: [],
      stopAdd: true,
      element: null,
      pageno:1,
      loadingflag:true,
      isScroll:false,
      isLoading:false
    }
  },
  methods: {
    // "[{"id":"15","uid":"24019","gid":"0","flag":"0","product_id":"102473","xinghao":{"id":"45032","shuxing":"1","xinghao":"1kg+200g*2+3","price":"57.00","ghprice":"41.84"},"quantity":"1","product":{"id":"102473","productid":"1125899907105345","name":"1kg超能洁净柔护洗衣液+200g*2纳爱斯自然盐白牙膏+亲齿家族按摩牙刷3支装 (YS706)(新疆、青海、西藏不发货)  （1kg+200g*2+3）  ","thumbnailimage":"https://img.yunzhonghe.com/image/1621489280074SdDMRAGkiq.jpg","goodsCode":"1125899907102568","goodsSkuCode":"1125899907105345","uid":"0","brand_id":"413"},"pinpai":{"id":"413","name":"超能"}},{"id":"17","uid":"24019","gid":"0","flag":"0","product_id":"117659","xinghao":{"id":"52072","shuxing":"1","xinghao":"5kg","price":"69.90","ghprice":"52.43"},"quantity":"1","product":{"id":"117659","productid":"1125899907102866","name":"柴火大院财火大院黑龙江长粒香米5kg    图片色【新疆、西藏、青海、宁夏、甘肃、海南、内蒙、港澳台不发货】  图片色  ","thumbnailimage":"https://img.yunzhonghe.com/image/1667187264565CyVRbLZMVf.jpg","goodsCode":"1125899907100270","goodsSkuCode":"1125899907102866","uid":"0","brand_id":"44"},"pinpai":{"id":"44","name":"柴火大院"}},{"id":"16","uid":"24019","gid":"0","flag":"0","product_id":"116619","xinghao":{"id":"51734","shuxing":"1","xinghao":"0104008","price":"19.80","ghprice":"14.29"},"quantity":"2","product":{"id":"116619","productid":"1125899907410064","name":"陇间柒月硒都大豆油418ml/桶 混色","thumbnailimage":"https://img.yunzhonghe.com/image/1687312649891ryJDnUSamC.jpg","goodsCode":"1125899908174566","goodsSkuCode":"1125899907410064","uid":"0","brand_id":"951"},"pinpai":{"id":"951","name":"陇间柒月"}}]"
    changeType(e) {
      this.orderList = []
      this.active = e
      this.pageno = 1
      this.isScroll = false
      this.getOrder(Number(this.active)+1)
      this.$router.replace({path: "/orderInfo", query: {tabIndex: e}})
    },
    getOrder(type){
      this.isLoading = true
      getOrderList({
        type,
        pageno:this.pageno,
        pagesize:10
      }).then(res=>{
        this.loadingflag = false
        this.isLoading = false
        if (res.data.list.length == 0) {
          this.isScroll = true
          return
        }
        // console.log(res)
        if(res.code == 200){
          res.data.list.forEach(item=>{
            this.orderList.push(item)
          })
          // console.log( this.orderList)
        }
      })
    },
    //滚动条事件
    handleScroll(e) {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
        this.onMost()
      }
    },
    onMost() {
      if (!this.isScroll) {
        this.pageno++
        // console.log(this.active,this.pageno)
        this.getOrder(Number(this.active)+1)
      }
    }
  },
  created() {
    this.active = this.$route.query.tabIndex
    this.getOrder(Number(this.active)+1)
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }
}
</script>

<style scoped lang="less">
.location {
  background-color: #F0F0F0;
  min-height: 100vh;
  position: relative;
}

.tab {
  //font-weight: bold;
  padding: 0px 24px;
  background-color: white;
}

/deep/ .van-tab span {
  font-weight: 600;
  font-size: 15px;
}

/deep/ .van-tabs__nav--line {
  padding-bottom: 8px;
}

.none {
  text-align: center;
  color: #8a8888;
  font-size: 14px;
  width: 100%;
  padding: 10px 0px;
}

.noneBack {
  width: 268px;
  margin: auto;
}

.noneText {
  text-align: center;
  font-size: 12px;
  color: #B5B4B4;
  margin-top: -60px;
}

.noneBox {
  margin-top: 40px;
}
</style>