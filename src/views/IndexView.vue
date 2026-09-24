<template>
  <div class="location" :style="'background-image: linear-gradient(to bottom ,'+ backColor+')'">
    <NProgress v-if="loadingflag"/>
    <div class="model" v-if="isShow"></div>
    <!--    头部-->
    <div class="topBox" ref="topBox">
      <div class="topPage">
        <!--      <div class="title">悦享聚汇</div>-->
        <div class="searchBox">
          <div>
            <!--      地址-->
            <City @getCity="getCity"></City>
          </div>
          <div class="searchValue" @click="toOther('/productList?index=1')" v-if="$store.state.festivals!=2">
            <van-search background="#fff0" placeholder="搜索你喜欢的东西" v-model="searchValue"/>
          </div>
          <div class="customer" @click="toCustomer">
            <img class="img" src="../assets/kfb.png" alt="">
          </div>
        </div>
      </div>
      <!--  banner-->
      <div class="banner" v-if="bannerList>0">
        <van-swipe :autoplay="3000" indicator-color="white" @change="onChange">
          <van-swipe-item class="bannerImg" v-for="item in bannerList" :key="item.img" @click="toBanner(item)">
            <img class="img"
                 :src=" item.img"
                 alt="">
          </van-swipe-item>
        </van-swipe>
      </div>
      <!--      <button @click="clear">清除所有缓存</button>-->
      <!--      分类 style="padding-top: 0px"  v-if="!festivals"-->
      <div class="sortBox" :style="{paddingTop:$store.state.festivals==0?'':'0px'}" v-if="classList.length>0">
        <!-- <div class="sortScroll" v-if="$store.state.festivals==0"> -->
        <div class="sortScroll">
          <div class="sortTop" :style="'width:'+ classList.length*68+'px;'">
            <div v-for="item in classList" :key="item.title" @click="toClass(item)">
              <div class="iconBox">
                <img class="img" :src="item.img" alt="">
              </div>
              <div class="sortText">{{ item.title }}</div>
            </div>
          </div>
        </div>
        <div class="sortTop sortCenter">
          <div class="sortItem" v-for="item in sortList" :key="item.title" @click="toSort(item)">
            <div class="iconImg" :style="{width:$store.state.festivals==2?'50px':''}">
              <img class="img" :src="item.img" alt="">
            </div>
            <div class="sortText">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <!--      甄选-->
      <!--      <div class="flexBox" v-if="$store.state.festivals!=2">-->
      <!--        <div class="toHome" v-for="item in funList.slice(0,1)" :key="item.id" @click="toNext(item.path)">-->
      <!--          <img class="img imgTitle" :src="item.img" alt="">-->
      <!--          <div class="titleBox">-->
      <!--            <div class="title">{{ item.title }}</div>-->
      <!--            <div class="text">{{ item.content }}</div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="toHome">-->
      <!--          <div style="position: relative;margin-top: 3px" v-for="item in funList.slice(1,3)" :key="item.id"-->
      <!--               @click="toNext(item.path)">-->
      <!--            <img class="img imgTitle" :src="item.img" alt="">-->
      <!--            <div class="titleBox">-->
      <!--              <div class="newShop">-->
      <!--                <div class="title" style="white-space: nowrap" :style="'color:'+item.colorText">{{ item.title }}</div>-->
      <!--                <div class="newShopText" style="white-space: nowrap" v-if="item.id == 3">新品来袭</div>-->
      <!--              </div>-->
      <!--              <div class="text" :style="'color:'+item.colorText">{{ item.content }}</div>-->
      <!--            </div>-->
      <!--            <div class="once" :style="'color:'+item.colorText">-->
      <!--              <div>立即前往</div>-->
      <!--              <div class="goRight">▲</div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div v-if="gonggao"  @click="toNext1()"> 
        <van-notice-bar
            :text="gonggao"
            left-icon="volume-o"
        />
      </div>
      <!--      限时抢购     -->
      <!--      <div class="sortBox panicBuying" v-if="flashSale.length>0&&$store.state.festivals!=2">-->
      <!--        <div class="panicTop">-->
      <!--          <div>-->
      <!--            <div class="downtimeBack">-->
      <!--              <div class="panicImg">-->
      <!--                特卖专区-->
      <!--              </div>-->
      <!--              <div style="color: #A8C2D6;font-size: 12px">|</div>-->
      <!--              <div class="text">超值好货不容错过</div>-->
      <!--              &lt;!&ndash;              <div class="downtime">&ndash;&gt;-->
      <!--              &lt;!&ndash;                <div class="time">00</div>&ndash;&gt;-->
      <!--              &lt;!&ndash;                <div>:</div>&ndash;&gt;-->
      <!--              &lt;!&ndash;                <div class="time">{{countdown.split(':')[0]}}</div>&ndash;&gt;-->
      <!--              &lt;!&ndash;                <div>:</div>&ndash;&gt;-->
      <!--              &lt;!&ndash;                <div class="time">{{countdown.split(':')[1]}}</div>&ndash;&gt;-->
      <!--              &lt;!&ndash;              </div>&ndash;&gt;-->
      <!--            </div>-->
      <!--          </div>-->
      <!--          <div class="more" @click="toOther('/flashSale')">-->
      <!--            &lt;!&ndash;            <div>&ndash;&gt;-->
      <!--            &lt;!&ndash;              <div>更多</div>&ndash;&gt;-->
      <!--            &lt;!&ndash;              <div>抢购</div>&ndash;&gt;-->
      <!--            &lt;!&ndash;            </div>&ndash;&gt;-->
      <!--            &lt;!&ndash;            <div>&ndash;&gt;-->
      <!--            &lt;!&ndash;              <van-icon size="17px" name="arrow"/>&ndash;&gt;-->
      <!--            &lt;!&ndash;            </div>&ndash;&gt;-->
      <!--            进入频道-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="birthdayBox">-->
      <!--          <div class="birthday" :style="'width:'+ flashSale.length*65+'px;'">-->
      <!--            <div class="listItem" style="position: relative;" @click="toDetail(item.id)" v-for="item in flashSale"-->
      <!--                 :key="item.id">-->
      <!--              <div class="imgMax shopImg">-->
      <!--                <div class="imgBox">-->
      <!--                  <img class="img" :src="item.thumbnailimage" alt="">-->
      <!--                </div>-->
      <!--              </div>-->
      <!--              <div class="shopInfo">-->
      <!--                <div class="hotText">-->
      <!--                  <div class="price" style="font-size: 10px">￥<span style="font-size: 12px">{{-->
      <!--                      changePrice1(item.xinghao[0].price)-->
      <!--                    }}</span>.{{ changePrice2(item.xinghao[0].price) }}-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--                &lt;!&ndash;                <div class="title">{{ item.name }}</div>&ndash;&gt;-->
      <!--                &lt;!&ndash;                <div class="priceBox">&ndash;&gt;-->
      <!--                &lt;!&ndash;                  <div class="price">补贴价 <span>{{ changePrice1(item.xinghao[0].price) }}</span>.{{ changePrice2(item.xinghao[0].price) }}</div>&ndash;&gt;-->
      <!--                &lt;!&ndash;                  &lt;!&ndash;                  <div class="plus">&ndash;&gt;&ndash;&gt;-->
      <!--                &lt;!&ndash;                  &lt;!&ndash;                    <van-icon size="8px" name="plus"/>&ndash;&gt;&ndash;&gt;-->
      <!--                &lt;!&ndash;                  &lt;!&ndash;                  </div>&ndash;&gt;&ndash;&gt;-->
      <!--                &lt;!&ndash;                </div>&ndash;&gt;-->
      <!--                &lt;!&ndash;                <div class="oprice">原价 {{ Number(item.xinghao[0].price).toFixed(2) }}</div>&ndash;&gt;-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <!--    节日好礼  -->
    <div class="festivals" @click="toFestivals(festivalsImg.url)" v-if="festivalsImg.img">
      <img class="img"
           :src="festivalsImg.img" alt="">
    </div>
    <!--    tab切换-->
    <div class="tabbar" :class="{tabbar2:show}" ref="topScroll" v-if="tabList.length>1">
      <div v-if="isLoading" class="isTab"
           :style="'width:'+ tabList.length*90+'px;'"></div>
      <div class="tabbarBox" :style="'width:'+ tabList.length*90+'px;'">
        <div class="tabItem" v-for="(item,index) in tabList" :key="item.id" @click="changeTab(item.id,index)">
          <div class="tabTop " :class="{tabTop2:active==item.id}">{{ item.syname }}</div>
          <div class="tabBottom" :class="{tabBottom2:active==item.id}">{{ item.tag }}</div>
        </div>
      </div>
    </div>
    <!--    列表-->
    <div class="listMax" :style="{minHeight:isHeight?'calc(100vh - 110px)':''}" :class="{fixedHeight:show}">
      <!--      <loading v-if="isLoading"></loading>-->
      <div class="listBox">
        <!--        <div v-if="shopList.length>0" v-for="(item,index) in shopList" :key="index" class="shopList">-->
        <!--          :style="{marginTop:(index+1)%2!=0&&(index+1)!=1&&active==0&&swiperHeight!==0?'-'+swiperHeight-3+'px':''}"-->
        <!--          <ShopList :flag="1" @ShopList="ShopList" :pinpai="item.pinpai" :listItem="item" :index="index"></ShopList>-->
        <NewShopList :flag="1" :shopSwiper="shopSwiper" :shopList="shopList" v-if="shopList.length>0" :active="active"
                     :swiperHeight="swiperHeight" @input="input"></NewShopList>
        <!--        </div>-->
        <loading style="margin-top: 2px" v-if="isLoading"></loading>
      </div>
    </div>
    <Tspage v-if="tabList.length == 0"></Tspage>
    <!--  tabbar-->
    <!--    <NavigationTab :active="0"></NavigationTab>-->
  </div>
</template>
<script>
import NavigationTab from "@/components/NavigationTab.vue";
import City from "@/components/City.vue";
import ShopList from "@/components/ShopList.vue";
import Tspage from "@/components/Tspage.vue";
import {flashSaleList, getGoodPickList, getHotList, getIndexList} from "@/api";
import FlashSale from "@/views/product/FlashSale.vue";
import NewShopList from "@/components/NewShopList.vue";

export default {
  name: "IndexView",
  computed: {
    FlashSale() {
      return FlashSale
    }
  },
  components: {
    NewShopList,
    ShopList,
    City,
    NavigationTab,
    Tspage
  },
  data() {
    return {
      searchValue: "",
      bannerList: [],
      classList: [],
      sortList: [],
      backColor: "",
      funList: [
        {
          id: 1,
          img: require("../assets/banner/zuo.png"),
          title: "甄选品牌",
          path: "/selectBrand",
          content: "官网买手精选推荐"
        },
        {
          id: 2,
          img: require("../assets/banner/you1.png"),
          title: "热门商品",
          content: "悦享热销商品",
          path: "/hotProduct",
          colorText: "#4F678E"
        },
        {
          id: 3,
          img: require("../assets/banner/you2.png"),
          title: "新品专区",
          content: "开启你的购物之旅",
          path: "/newProduct",
          colorText: "#694E33"
        },
      ],
      active: 0,
      tabList: [
        //     {
        //   flag: "1",
        //   id: "0",
        //   syname: "热门推荐",
        //   tag: "精选好物",
        // }
      ],
      shopSwiper: [],
      itemHeight: 0,
      swiperHeight: 0,
      flashSale: [],
      shopList: [],
      pageno: 1,
      isScroll: false,
      timer: null,
      leftList: [],
      rightList: [],
      isHeight: false,
      isFixed: false,
      kefu: localStorage.getItem("kefu"),
      timeDowm: 1800,
      countdown: "",
      loadingflag: true,
      isLoading: false,
      show: false,
      timer2: null,
      isTab: false,
      isShow: true,
      gonggao: "",
      festivalsImg: ""
    }
  },
  methods: {
    toFestivals(url) {
      if (url) {
        window.location.href = url
      } else {
        this.$router.push('/festivals')
      }
    },
    //头部fixed定位
    showSearch() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > this.$refs.topBox.getBoundingClientRect().height) {   // 当页面滚动到高度300px处，动态绑定class 来设置头部固定定位
        this.show = true;
      } else {
        this.show = false;
      }
    },
    clear() {
      localStorage.clear()
      sessionStorage.clear()
      this.$store.commit("settoken", "")
    },
    toBanner(item) {
      // console.log(item)
      if (item.url) {
        window.location.href = item.url
      }
    },
    toSort(item) {
      // console.log(item)
      this.$router.push(item.url.split("#")[1])
    },
    toClass(item) {
      console.log('点击了===',item)
      // if (item.title == "电影频道") {
      //   window.location.href = item.url + "&token=" + localStorage.getItem("token") + "&cityName=" + sessionStorage.getItem("cityName")
      // } else if (item.title == "蛋糕甜品") {
      //   window.location.href = this.$store.state.cakeUrl + "/index?cake=1&token=" + localStorage.getItem("token") + "&cityName=" + sessionStorage.getItem("cityName")
      // }else if (item.title == "自助点餐") {
      //   window.location.href = this.$store.state.cakeUrl + "/orderfood?cake=2&token=" + localStorage.getItem("token") + "&cityName=" + sessionStorage.getItem("cityName")
      // } else {
      // "http://yxfmm.bjyxfl.com/cake2/#/orderfood"
      // window.location.href = item.url + "?token=" + localStorage.getItem("token") + "&cityName=" + sessionStorage.getItem("cityName") + "&longitude=" + sessionStorage.getItem("longitude") + "&latitude=" + sessionStorage.getItem("latitude")
      // sessionStorage.removeItem("targetId")
      window.location.href = item.zxurl
      // }
      // 蛋糕甜品  http://yxfmm.bjyxfl.com/cake/#/?cake=1
      // 自助点餐  http://yxfmm.bjyxfl.com/cake/#/orderfood?cake=2
    },
    getadver() {
      let time = parseInt(new Date().getTime() / 1000) + '';
      // this.timeDowm = Number(this.orderDetail.expiretime) - time
      const countdownInterval = setInterval(() => {
        const minutes = Math.floor(this.timeDowm / 60);
        const seconds = this.timeDowm % 60;
        this.countdown = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.timeDowm--;
        if (this.timeDowm <= 0) {
          clearInterval(countdownInterval);
          // 倒计时结束后的操作
          this.timeDowm = 1800
          this.getadver()
        }
        localStorage.setItem("timeDowm", this.timeDowm)
      }, 1000);
    },
    toCustomer() {
      window.location.href = this.kefu
    },
    toDetail(id) {
      // if (flag == 1) {
      this.$router.push({path: "/productDetail", query: {id}})
      // }
      // if (this.flag == 2) {
      //   window.location.href = `http://yxfmm.bjyxfl.com/film/#/couponsdetail?id=` + this.listItem.id
      // }
    },
    input(e) {
      // this.shopList  = e
      // console.log(this.shopList,"3333333333333333333")
    },
    // 价格处理
    changePrice1(price) {
      return price.toString().includes(".") ? price.toString().split('.')[0] : price
    },
    changePrice2(price) {
      return price.toString().includes(".") ? Number(price).toFixed(2).toString().split('.')[1] : "00"
    },
    changeTab(id, index) {
      this.isHeight = true
      this.isScroll = false
      this.shopList = []
      this.pageno = 1
      this.active = id
      this.isTab = true
      // // 清除之前的定时器
      // if(this.timer2){
      //   clearTimeout(this.timer2);
      //   this.timer2 = null
      // }
      // console.log(this.timer2)
      // // 设置新的定时器，延迟执行搜索逻辑
      // this.timer2 = setTimeout(() => {
      //   // 实际的搜索逻辑，这里可以调用搜索接口等
      //   console.log("]]]")
      //   this.timer2 = null
      // }, 100);
      // let num = 0
      // if(Math.floor(this.$refs.topScroll.getBoundingClientRect().top)>=1){
      //   console.log(Math.floor(this.$refs.topScroll.getBoundingClientRect().top))
      // this.timer = setInterval(()=>{
      //   num++
      // document.documentElement.scrollTop += num
      document.documentElement.scrollTop += this.$refs.topScroll.getBoundingClientRect().top + 5
      //   if(this.$refs.topScroll.getBoundingClientRect().top<=num-13){
      //     clearInterval(this.timer)
      //   }
      // },30)
      // }
      if (id == 0) {
        this.getGoodPick(1)
      } else {
        this.getHot(this.active, 1)
      }
      this.timer2 = null
      if ((index + 1) >= 3) {
        this.$refs.topScroll.scrollLeft = 60 * (index + 1)
      } else {
        this.$refs.topScroll.scrollLeft = 0
      }
    },
     toNext1() {
       
      window.location.href = this.$store.state.Shopbase + '/notification'
    },
    toNext(path) {
      this.$router.push(path)
    },
    onChange(index) {
      this.backColor = this.bannerList[index].yanse1 + ',' + this.bannerList[index].yanse2
      // if(this.$refs.bannerBox){
      //   setTimeout(() => {
      //     this.swiperHeight = (this.$refs.bannerBox.offsetWidth * 1.64).toFixed(0)
      //   }, 10)
      // }
    },
    ShopList(a) {
      this.itemHeight = a
    },
    getIndex() {
      getIndexList().then(res => {
        if (res.code == 200) {
          // console.log('res.data.fulika',res.data.fulika)
          this.festivalsImg = res.data.fulika
          this.shopSwiper = res.data.jingxuantu
          this.gonggao = res.data.gonggao.gonggao
          this.bannerList = res.data.nav
          this.classList = res.data.sytype
          if (this.$store.state.festivals == 2) {
            this.sortList = res.data.syclass.filter(item => item.title.includes("粮油") || item.title.includes("零食") || item.title.includes("饮料") || item.title.includes("水果"))
          } else {
            this.sortList = res.data.syclass
          }
          this.backColor = this.bannerList[0].yanse1 + ',' + this.bannerList[0].yanse2
        }
      })
    },
    getFlashSaleList() {
      flashSaleList().then(res => {
        if (res.code == 200) {
          res.data.product_class.forEach(item => {
            this.tabList.push(item)
          })
          if (this.$store.state.festivals == 2) {
            this.tabList = this.tabList.filter(item => item.id == 1 || item.id == 2 || item.id == 3)
          } else if (this.$store.state.festivals == 1) {
            this.tabList = this.tabList.filter(item => item.syname != "")
          }
          if (this.tabList.length > 0) {
            this.active = this.tabList[0].id
            // if (this.$store.state.festivals == 2) {
            this.getHot(this.active, 1)
            // }
          }else {
            this.loadingflag = false;
            this.isShow = false;
          }
          this.flashSale = res.data.flash_sale
        }
      })
    },
    getHot(fid, pageno = this.pageno) {
      if (this.isTab) {
        this.shopList = []
      }
      this.isLoading = true
      getHotList({
        fid,
        pageno,
        pagesize: 10
      }).then(res => {
        this.isLoading = false
        setTimeout(() => {
          this.loadingflag = false
        }, 500)
        if (res.code == 200) {
          if (res.data.product_list.length == 0) {
            this.isScroll = true
            return
          }
          res.data.product_list.forEach(item => {
            this.shopList.push(item)
          })
          this.isTab = false
          // if(this.$refs.bannerBox){
          //   setTimeout(() => {
          //     this.swiperHeight = (this.$refs.bannerBox.getBoundingClientRect().height).toFixed(0)
          //   }, 200)
          // }
        }
      })
    },
    getGoodPick(pageno = this.pageno) {
      if (this.isTab) {
        this.shopList = []
      }
      this.isLoading = true
      getGoodPickList({
        pageno,
        pagesize: 10
      }).then(res => {
        this.isLoading = false
        setTimeout(() => {
          this.loadingflag = false
        }, 500)
        if (res.code == 200) {
          if (res.data.product_list.length == 0) {
            this.isScroll = true
            return
          }
          res.data.product_list.forEach(item => {
            this.shopList.push(item)
          })
          // console.log( this.shopList.length)
          this.isTab = false
          // if(this.$refs.bannerBox){
          //   setTimeout(() => {
          //     this.swiperHeight = (this.$refs.bannerBox.getBoundingClientRect().height).toFixed(0)
          //   }, 200)
          // }
        }
      })
    },
    getCity(e) {
      this.isShow = false
    },
    toOther(path) {
      this.$router.push(path)
    },
    //滚动条事件
    handleScroll(e) {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // console.log(Math.ceil(scrollTop + clientHeight), scrollHeight)
      if (Math.ceil(scrollTop + clientHeight) >= scrollHeight && !this.isTab) {
        this.onMost()
      }
    },
    onMost() {
      // console.log(this.isScroll)
      if (!this.isScroll) {
        this.pageno++
        // console.log(this.active,this.pageno)
        // if (this.active == 0) {
        //   this.getGoodPick(this.pageno)
        // } else {
        //   this.getHot(this.active, this.pageno)
        // }
        if (this.active != 0) {
          this.getHot(this.active, this.pageno)
        }
      }
    }
  },
  created() {
    // this.$router.options.routes.forEach((item,index)=>{
    //   if(item.meta){
    //     if(item.meta.keep){
    //       item.meta.keepAlive=true
    //     }
    //   }
    // })
    // console.log(this.$router.options.routes)
    this.getIndex()
    this.getFlashSaleList()
    // if (this.$store.state.festivals != 2) {
    //   this.getGoodPick()
    // }
    // if(localStorage.getItem("timeDowm")){
    //   this.timeDowm = localStorage.getItem("timeDowm")
    //   this.getadver()
    // }else{
    //   this.getadver()
    // }
    // setTimeout(()=>{
    //   this.loadingflag = false
    // },2000)
    if (sessionStorage.getItem("cityName") || sessionStorage.getItem("promptcity") == 2) {
      this.isShow = false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('scroll', this.showSearch);
    // setTimeout(() => {
    //   this.swiperHeight = (this.$refs.bannerBox.offsetWidth * 1.64 - this.itemHeight).toFixed(0)
    // }, 300)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, false);
    window.removeEventListener('scroll', this.showSearch, false);
  },
}
</script>

<style scoped lang="less">
.location {
  padding-bottom: 50px;
  background-color: #F0F0F0;
  min-height: 100vh;
}

/deep/ .van-swipe__indicator {
  display: none;
}

.topBox {
  padding: 0px 10px 5px;
  overflow: hidden;
  //头部
  .topPage {
    padding: 0px 15px;

    .title {
      text-align: center;
      color: white;
      font-size: 14px;
    }

    .address {
      display: flex;
      align-items: center;
      gap: 8px;
      color: white;
    }

    .searchBox {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }


    .searchValue {
      width: 80%;
    }

    .van-search {
      padding-bottom: 6px;
      padding-top: 6px;
    }

    .van-search .van-cell {
      background-color: transparent;
    }

    .van-search__content {
      background-color: #FFFFFF;
      border-radius: 30px;
    }

    /deep/ .van-field__control {
      color: #92716D;
    }

    .customer {
      width: 23px;
    }
  }

  .banner {
    width: calc(100% + 30px);
    box-sizing: border-box;
    margin-left: -15px;
  }

  .sortBox {
    border-radius: 10px;
    background-color: #ffffff6e;
    padding: 19px 7px;
    margin-top: 5px;

    .sortTop {
      display: flex;
      align-items: center;
      justify-content: space-between;
      //width: 87%;
      margin: auto;

      .iconBox {
        width: 50px;
        width: 74%;
        margin: auto;
      }

      .sortText {
        text-align: center;
        font-size: 12px;
        font-weight: bold;
      }
    }

    .sortCenter {
      flex-wrap: wrap;
      color: #212226;
      width: 100%;

      .sortItem {
        width: 20%;
        margin-top: 16px;
      }

      .iconImg {
        width: 38px;
        //width: 56%;
        margin: auto;
      }
    }
  }

  .panicBuying {
    width: 100%;
    height: 128px;
    background-image: url("@/assets/banner/back.png");
    background-size: 100% 100%;
    box-sizing: border-box;
    margin-top: 7px;
    padding: 5px 13px;
    background-color: transparent;

    .panicTop {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .downtimeBack {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .downtime {
        display: flex;
        align-items: center;
        font-size: 12px;
        gap: 3px;
        color: #DE1616;
        margin-top: -5px;
      }

      .time {
        color: white;
        background-color: #DE1616;
        border-radius: 5px;
        padding: 2px;
        width: 15px;
        height: 14px;
        line-height: 14px;
        text-align: center;
      }

      .panicImg {
        //width: 67px;
        color: #31507F;
        font-weight: bold;
      }

      .text {
        font-size: 12px;
        color: #857167;
      }

      .more {
        //display: flex;
        //align-items: center;
        //gap: 5px;
        font-size: 10px;
        background-image: linear-gradient(to right, #497DC5, #5495DE);
        padding: 2px;
        width: 58px;
        text-align: center;
        border-radius: 30px;
        color: #EEF4FB;
      }
    }

    .birthdayBox {
      overflow-x: auto;
      overflow-y: hidden;
      margin-top: 5px;
      background-color: white;
      border-radius: 10px;

      .birthday {
        display: flex;
        gap: 5px;
        padding: 5px 0px;

        .listItem {
          width: 100%;
          padding-bottom: 5px;

          .hotText {
            background-color: #FFF8FC;
            border: 1px solid #FBE7F0;
            color: #F0585E;
            border-radius: 30px;
            text-align: center;
            font-size: 12px;
            //width: 70%;
            margin: auto;
            position: relative;
            z-index: 2;
            padding: 2px 0px;
          }

          .title {
            font-size: 12px;
            font-weight: bold;
            color: #313131;
            padding-top: 3px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 2; /* 显示两行 */
          }

          .shopInfo {
            padding: 0px 6px;
          }


          .oprice {
            font-size: 10px;
            color: #A1A1A1;
            text-decoration: line-through;
          }
        }
      }
    }


    .birthdayBox::-webkit-scrollbar {
      display: none
    }
  }

  .flexBox {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 7px;

    .toHome {
      width: 50%;
      position: relative;
    }

    .titleBox {
      position: absolute;
      top: 11px;
      left: 10px;

      .title {
        font-weight: bold;
        font-size: 18px;
      }

      .text {
        font-size: 12px;
        color: #675f61;
        padding-top: 2px;
      }
    }

    .newShop {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .newShopText {
      border-radius: 30px;
      background-image: linear-gradient(to bottom, #FE0D50, #FE6E21, #FEBE90);
      color: white;
      font-size: 12px;
      padding: 3px;
      border-bottom-left-radius: 0px;
    }

    .goRight {
      transform: rotate(90deg);
      padding-top: 1px;
      font-size: 8px;
    }

    .once {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 20px;
      left: 10px;
      gap: 2px;
      font-size: 12px;
      border-radius: 30px;
      padding: 1px 5px 2px 6px;
      border: 1px solid;
    }
  }
}

.imgTitle {
  border-radius: 10px;
}

.plus {
  color: white;
  background-color: #CA403E;
  border-radius: 50%;
  width: 13px;
  height: 13px;
  font-size: 12px;
  text-align: center;
  line-height: 13px;
  padding: 1px;
}

.priceBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.price {
  color: #CA4240;
  font-size: 13px;
  white-space: nowrap;
}

.price span {
  font-size: 15px;
}

.tabbar {
  background-color: #fff;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 3px 15px;
  margin-top: 3px;
  position: relative;

  .tabbarBox {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .tabItem {
    width: 100%;
  }

  .tabTop {
    //font-weight: bold;
    text-align: center;
    font-size: 15px;
  }

  .tabBottom {
    font-size: 12px;
    color: #A8A8A8;
    text-align: center;
    padding-top: 2px;
  }

  .tabTop2 {
    color: #115EA3;
  }

  .tabBottom2 {
    padding: 2px 0px;
    width: 85%;
    margin: auto;
    margin-top: 2px;
    background-color: #3EA5FF;
    color: #F1F8FF;
    border-radius: 30px;
    font-size: 13px;
  }
}

.tabbar2 {
  position: fixed;
  top: -5px;
  left: 0;
  z-index: 99;
  width: 100%;
}


.listMax {
  padding: 0px 10px;
  padding-bottom: 10px;

  .bannerBox {
    width: 48%;
    margin-top: 10px;
  }

  .listBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    //gap: 6px;
    width: 100%;
    align-items: flex-start;
  }

  .listItem {
    width: 48.9%;
    background-color: white;
    border-radius: 10px;
  }
}

.shopImg {
  border-bottom-right-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

.imgMax {
  width: 100%;
  //height: 103px;
  overflow: hidden;
  //display: flex;
  //align-items: center;
  //justify-content: center;
  border-radius: 10px;
  height: 51px;
}

.imgMax2 {
  //height: 164px;
}

//.van-swipe {
//  border-radius: 10px;
//}

.shopList {
  width: 48.9%;
  //width: 100%;
  margin-top: 10px;
}

.listBox2 {
  margin-top: -39px;
}

.imgBox {
  width: 80%;
  margin: auto;
}

.leftBox {
  display: flex;
  justify-content: space-between;
  //gap: 10px;
  margin-top: -10px;
}

.bannerImg {
  width: 100%;
}

.tabbar::-webkit-scrollbar {
  display: none
}

.sortScroll {
  overflow-x: auto;
  overflow-y: hidden;
}

.sortScroll::-webkit-scrollbar {
  display: none
}

.fixedHeight {
  padding-top: 50px;
}

.isTab {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.model {
  background-color: transparent;
  position: fixed;
  left: 0;
  top: 50px;
  width: 100%;
  height: 100vh;
  z-index: 9999;
}

/deep/ .van-notice-bar {
  border-radius: 6px;
}

.festivals {
  padding: 3px 10px 0px;
}
</style>