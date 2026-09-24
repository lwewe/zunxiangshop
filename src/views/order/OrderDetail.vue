<template>
  <div class="location">
    <NProgress v-if="loadingflag"/>
    <ReturnBack :rcolor="'#fff'" :bcolor="'#CCCCCC'"></ReturnBack>
    <!--    地址-->
    <div class="addressBox" v-if="addrShow">
      <div class="address">
        <div class="leftBox">
          <div class="addressIcon">
            <img class="img" src="../../assets/tubiao/dd.png" alt="">
          </div>
          <div>
            <div>
              <span class="userName">{{ addrShow.name }}</span>
              <span class="phone">{{ addrShow.phone }}</span>
            </div>
            <div class="addressDetail" v-if="!addrShow.area">{{ addrShow.province ? addrShow.province.name : "" }}
              {{ addrShow.city ? addrShow.city.name : "" }} {{ addrShow.county ? addrShow.county.name : "" }}
              {{ addrShow.town ? addrShow.town.name : "" }} {{ addrShow.addr }}
            </div>
            <div class="addressDetail" v-else>{{ addrShow.province ? addrShow.province : "" }}
              {{ addrShow.city ? addrShow.city : "" }} {{ addrShow.area ? addrShow.area : "" }} {{ addrShow.addr }}
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    订单信息-->
    <!--    订单信息-->
    <div class="addressBox addressBox2"  v-if="child_flag==1">
      <div class="itemTitle">总订单信息</div>
      <div class="orderInfo">
        <div class="shopPrice">
          <div class="shopPriceText">订单状态</div>
          <!--          1-待收货  2-已完成  3-已取消-->
          <div class="price" v-if="orderShow.state==0">待发货</div>
          <div class="price" v-if="orderShow.state==1">待收货</div>
          <div class="price" v-if="orderShow.state==2">已完成</div>
          <div class="price" v-if="orderShow.state==3">已取消</div>
        </div>
        <div class="shopPrice">
          <div class="shopPriceText">订单号</div>
          <div class="price">{{ order.order_no }}</div>
        </div>
        <div class="shopPrice">
          <div class="shopPriceText">下单时间</div>
          <div class="price">{{ timestampToTime(order.add_time) }}</div>
        </div>
        <div class="shopPrice">
          <div class="shopPriceText">支付方式</div>
          <div class="price" v-if="order.transaction_id">微信</div>
          <div class="price" v-else>尊享券</div>
        </div>
        <div class="shopPrice">
          <div class="shopPriceText">支付总金额</div>
          <div class="price">￥{{order.zongji}}</div>
        </div>
      </div>
    </div>
    <div v-if="child_flag==1">
      <div v-for="(item,index) in child" :key="index">
        <!--    商品信息-->
        <div class="addressBox addressBox2">
          <div class="itemTitle">商品信息</div>
          <div class="shopInfo" v-for="key in item.product" :key="key.id">
            <!--        {{key}}-->
            <div class="shopImg">
              <img style="border-radius: 5px;" class="img" :src="(key.thumbnailimage.startsWith('https')||key.thumbnailimage.startsWith('http'))?key.thumbnailimage:$store.state.imgUrl+key.thumbnailimage" alt="">
            </div>
            <div class="nameBox">
              <div class="shopName">{{ key.name }}</div>
              <div class="can">{{ key.productcode }}</div>
              <div class="all">
                <div class="price">{{ key.marketprice }}</div>
                <div class="number">×{{ key.sl }}</div>
              </div>
            </div>
          </div>
        </div>
        <!--    快递信息-->
        <div class="addressBox addressBox2" v-if="item.express_list.shipment_name">
          <div class="itemTitle">快递信息</div>
          <div class="orderInfo">
            <div class="shopPrice">
              <div class="shopPriceText">快递</div>
              <div class="price">{{ item.express_list.shipment_name }}</div>
            </div>
            <div class="shopPrice">
              <div class="shopPriceText">快递单号</div>
              <div class="price">{{ item.express_list.shipment_order }}</div>
            </div>
          </div>
        </div>
        <!--    物流信息-->
       <div class="addressBox addressBox2" v-if="item.express_list.contents"  style="padding-bottom: 30px">
         <div style="padding-bottom: 40px" :class="{unfoldHeight:!item.isHeight}">
           <div class="itemTitle">物流信息</div>
           <div class="orderInfo">
             <div class="shopPrice" style="display: block" v-for="item2 in item.express_list.contents" :key="item2.time">
               <div class="price">{{ item2.time }}</div>
               <div class="shopPriceText">{{ item2.description }}</div>
             </div>
           </div>
           <div class="unfold" @click="item.isHeight=!item.isHeight">
             <div>{{item.isHeight?'收起':'展开'}}</div>
             <div v-if="!item.isHeight"><van-icon name="arrow-down" /></div>
             <div v-else><van-icon name="arrow-up" /></div>
           </div>
         </div>
       </div>
        <!--    订单信息-->
        <div class="addressBox addressBox2">
          <div class="itemTitle">子订单信息</div>
          <div class="orderInfo">
            <div class="shopPrice">
              <div class="shopPriceText">订单状态</div>
              <!--          1-待收货  2-已完成  3-已取消-->
              <div class="price" v-if="item.status=='waiting_audit'||orderShow.status=='waiting_shipment'">待发货</div>
              <div class="price" v-if="item.status=='waiting_confirmed'">待收货</div>
              <div class="price" v-if="item.status=='completed'">已完成</div>
              <div class="price" v-if="item.status=='canceld'">已取消</div>
            </div>
            <div class="shopPrice">
              <div class="shopPriceText">订单号</div>
              <div class="price">{{ item.key }}</div>
            </div>
<!--            <div class="shopPrice">-->
<!--              <div class="shopPriceText">下单时间</div>-->
<!--              <div class="price">{{ timestampToTime(order.add_time) }}</div>-->
<!--            </div>-->
<!--            <div class="shopPrice">-->
<!--              <div class="shopPriceText">支付方式</div>-->
<!--              <div class="price" v-if="order.transaction_id">微信</div>-->
<!--              <div class="price" v-else>尊享券</div>-->
<!--            </div>-->
          </div>
        </div>
      </div>
    </div>
    <div v-if="child_flag==0">
        <!--    商品信息-->
      <div class="addressBox addressBox2" v-if="orderShow.content">
        <div class="itemTitle">商品信息</div>
        <div class="shopInfo" v-for="key in orderShow.content" :key="key.id">
          <!--                    {{key}}-->
          <div class="shopImg">
            <img style="border-radius: 5px;" class="img" :src="(key.product.thumbnailimage.startsWith('https')||key.product.thumbnailimage.startsWith('http'))?key.product.thumbnailimage:$store.state.imgUrl+key.product.thumbnailimage" alt="">
          </div>
          <div class="nameBox">
            <div class="shopName">{{ key.product.name }}</div>
            <div class="can" v-if="key.xinghao.xinghao">{{ key.xinghao.xinghao }}</div>
<!--            <div class="can" v-else>{{ key.xinghao }}</div>-->
            <div class="all">
              <div class="price" v-if="key.xinghao.price">{{ key.xinghao.price }}</div>
              <div class="price" v-else>{{ key.marketprice }}</div>
              <div class="number">×{{ key.quantity }}</div>
            </div>
          </div>
        </div>
      </div>
        <!--    快递信息-->
        <div class="addressBox addressBox2" v-if="express">
          <div class="itemTitle">快递信息</div>
          <div class="orderInfo">
            <div class="shopPrice">
              <div class="shopPriceText">快递</div>
              <div class="price">{{ express }}</div>
            </div>
            <div class="shopPrice">
              <div class="shopPriceText">快递单号</div>
              <div class="price">{{ orderShow.num }}</div>
            </div>
          </div>
        </div>
        <!--    物流信息-->
       <div class="addressBox addressBox2" v-if="orderShow.express_list"  style="padding-bottom: 30px">
         <div  style="padding-bottom: 40px" :class="{unfoldHeight:!isHeight}">
           <div class="itemTitle">物流信息</div>
           <div class="orderInfo">
             <div class="shopPrice" style="display: block" v-for="item in orderShow.express_list" :key="item.time">
               <div class="price">{{ timestampToTime(item.time) }}</div>
               <div class="shopPriceText">{{ item.desc }}</div>
             </div>
           </div>
         </div>
         <div class="unfold" @click="isHeight=!isHeight">
           <div>{{isHeight?'收起':'展开'}}</div>
           <div v-if="!isHeight"><van-icon name="arrow-down" /></div>
           <div v-else><van-icon name="arrow-up" /></div>
         </div>
       </div>
      <!--    订单信息-->
      <div class="addressBox addressBox2">
        <div class="itemTitle">订单信息</div>
        <div class="orderInfo">
          <div class="shopPrice">
            <div class="shopPriceText">订单状态</div>
            <!--          1-待收货  2-已完成  3-已取消-->
            <div class="price" v-if="orderShow.state==0">待发货</div>
            <div class="price" v-if="orderShow.state==1">待收货</div>
            <div class="price" v-if="orderShow.state==2">已完成</div>
            <div class="price" v-if="orderShow.state==3">已取消</div>
          </div>
          <div class="shopPrice">
            <div class="shopPriceText">订单号</div>
            <div class="price">{{ orderShow.order_no }}</div>
          </div>
          <div class="shopPrice">
            <div class="shopPriceText">下单时间</div>
            <div class="price">{{ timestampToTime(order.add_time) }}</div>
          </div>
          <div class="shopPrice">
            <div class="shopPriceText">支付方式</div>
            <div class="price" v-if="order.transaction_id">微信</div>
            <div class="price" v-else>尊享券</div>
          </div>
        </div>
      </div>
    </div>
    <!--    订单明细-->
    <div class="addressBox addressBox2">
      <div class="itemTitle">订单明细</div>
      <div class="orderInfo">
        <div class="shopPrice">
          <div class="shopPriceText">商品金额</div>
          <div class="price">￥{{ orderShow.price }}</div>
        </div>
        <div class="shopPrice">
          <div class="shopPriceText">运费</div>
          <div class="price">￥0.00</div>
        </div>
        <div class="shopPrice">
          <div class="shopPriceText">合计</div>
          <div class="price price1">￥{{ orderShow.price }}</div>
        </div>
      </div>
    </div>
    <div class="service" @click="toKefu">
      <div>如有问题，请联系客服 全年无休(9:00-21:00)</div>
      <div class="serviceBox">
        <img class="img" src="../../assets/kf.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import Payment from "@/components/Payment.vue";
import {getOrderDetail} from "@/api/mine";

export default {
  name: "OrderDetail",
  components: {Payment},
  data() {
    return {
      cardList: [],
      addrShow: {},
      order: {},
      orderShow: {},
      expressList: {},
      express: "",
      loadingflag: true,
      child: [],
      child_flag: "",
      isHeight:false
    }
  },
  methods: {
    toKefu() {
      window.location.href = localStorage.getItem("kefu")
    },
    timestampToTime(time) {
      // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var date = new Date(time * 1000)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + " " + h + ":" + m + ":" + s
    },
    getDetail(id) {
      this.child = []
      getOrderDetail({
        id
      }).then(res => {
        this.loadingflag = false
        // console.log(res)
        if (res.code == 200) {
          this.order = res.data.order
          this.orderShow = res.data.order_show
          if( res.data.order_show.child){
            res.data.order_show.child.forEach(item=>{
              this.child.push({
                ...item,
                isHeight:false
              })
            })
          }
          // this.child = res.data.order_show.child
          this.child_flag = res.data.order_show.child_flag
          this.expressList = res.data.express_list
          this.addrShow = res.data.address
          if(this.orderShow.express_id){
            this.express = res.data.express.filter(item => item.id == this.orderShow.express_id)[0].name
          }
        }
      })
    }
  },
  created() {
    this.getDetail(this.$route.query.id)
  }
}
</script>
<style scoped lang="less">
.location {
  background-color: #F0F0F0;
  padding: 10px;
  min-height: 100vh;
  box-sizing: border-box;
}


.addressBox {
  padding: 13px 10px;
  background-color: white;
  border-radius: 10px;

  .address {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .addressIcon {
    width: 20px;
  }

  .phone {
    padding-left: 10px;
    font-size: 12px;
    color: #797979;
  }

  .addressDetail {
    font-size: 13px;
    font-weight: bold;
    margin-top: 3px;
  }

  .userName {
    font-size: 15px;
    font-weight: bold;
  }

  .leftBox {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}

.addressBox2 {
  margin-top: 10px;
  padding: 13px 15px 15px;
  position: relative;
}


.itemTitle {
  font-weight: bold;
  font-size: 15px;
}

.textarea {
  background-color: #F6F6F6;
  height: 94px;
  border-radius: 3px;
  margin-top: 5px;
  padding: 10px;
  box-sizing: border-box;
}

.textarea textarea {
  border: none;
  background-color: #fff0;
  font-size: 13px;
}

.orderInfo {
  .shopPrice {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
  }

  .shopPriceText {
    color: #828282;
    font-size: 14px;
  }

  .price {
    font-size: 14px;
    font-weight: bold;
  }

  .price1 {
    color: #C93F3D;
  }
}

.shopInfo {
  margin-top: 15px;
  display: flex;
  align-items: flex-start;
  gap: 10px;

  .shopImg {
    width: 77px;
  }

  .nameBox {
    width: 73%;
  }

  .shopName {
    font-size: 14px;
    font-weight: bold;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1; /* 显示两行 */
  }

  .can {
    margin-top: 13px;
    font-size: 13px;
    color: #979797;
  }

  .all {
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
  }

  .price {
    color: #C63532;
    font-weight: bold;
    font-size: 15px;
  }

  .number {
    color: #989898;
  }
}

//客服
.service {
  background-color: white;
  color: #5b5a5a;
  font-size: 13px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  margin-top: 10px;

  .serviceBox {
    width: 18px;
    padding-top: 1px;
  }
}
.unfold{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 12px;
  gap: 5px;
  margin-top: 10px;
  position: absolute;
  bottom: 6px;
  right: 6px;
}
.unfoldHeight{
  height: 110px;
  overflow: hidden;
}
</style>