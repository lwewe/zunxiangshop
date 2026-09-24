<template>
  <div class="conPage" :style="'background-color:'+kace.bgcolor">
    <NProgress v-if="loadingflag"/>
    <div>
      <div class="option" :class="{option1:show}"
           :style="'color: '+kace.titfontcolor+';background-color:'+kace.titbgcolor">{{ kace.title }}
      </div>
      <!--   banner-->
      <div ref="topBox">
        <img class="img" :src="kace.banner" alt="">
      </div>
    </div>
    <!--    tab切换-->
    <div class="tabbar" ref="topScroll" v-if="show" :style="'background-color:'+kace.flmrbgcolor">
      <div v-if="isLoading" class="isTab"
           :style="'width:'+ tabList.length*83+'px;'"></div>
      <div class="tabbarBox" :style="'width:'+ tabList.length*82+'px;'">
        <div class="tabItem" v-for="(item,index) in tabList" :key="item.id" @click="changeTab(item.id,index)"
             v-if="item.product_list.length>0">
          <div class="tabBottom " :class="{tabBottom2:active==item.id}"
               :style="{color:item.id==active?kace.xzflfontcolor:kace.flmrfontcolor,backgroundColor:item.id==active?kace.xzflbgcolor:''}">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <!--   列表-->
    <div class="listMax">
      <div class="listMaxCon" v-for="(item3,index3) in tabList" :key="item3.id" :id="'s'+item3.id"
           v-if="item3.product_list.length>0">
        <div style="height: 80px;" v-if="active==item3.id&&show&&isShow"></div>
        <div class="listBox">
          <div class="titleBox" :style="'background-image: url('+item3.flimg+')'"></div>
          <div class="listItem" :class="{listItem1:index2==0}"
               v-for="(item2,index2) in Math.ceil(item3.product_list.length/3)" :key="index2">
            <div class="shopList" v-for="item in  item3.product_list.slice(index2*3,(index2+1)*3)" :key="item.id">
              <ShopList :listItem="item" :orderGid="order.gid" :itemColor="kace.titfontcolor" :flag="1"
                        :fes="1"></ShopList>
            </div>
          </div>
        </div>
        <div class="cloud" v-if="index3!=tabList.length-1&&item3.product_list.length>0">
          <img class="img" :src="kace.bgimg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ShopList from "@/components/ShopList.vue";
import {getFestival} from "@/api";
// import {getIndex} from "@/api";

export default {
  name: "IndexView",
  components: {ShopList},
  data() {
    return {
      isLoading: true,
      tabList: [],
      active: 0,
      show: false,
      isShow: false,
      isScroll: true,
      kace: {},
      loadingflag: true,
      order: {}
    }
  },
  methods: {
    //头部fixed定位
    topSearch() {
      // if(!this.isScroll){
      //   this.isScroll = true
      //   return
      // }
      // this.isShow = false
    },
    //头部fixed定位
    showSearch() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > this.$refs.topBox.getBoundingClientRect().height - 200) {   // 当页面滚动到高度300px处，动态绑定class 来设置头部固定定位
        this.show = true;
      } else {
        this.show = false;
        this.isShow = false
        if (this.tabList.length > 0) {
          this.active = this.tabList[0].id
        }
      }
    },
    changeTab(id, index) {
      document.querySelector('#s' + id).scrollIntoView(true);
      this.isScroll = false
      this.isShow = true
      this.shopList = []
      this.active = id
      if ((index + 1) >= 3) {
        this.$refs.topScroll.scrollLeft = 60 * (index + 1)
      } else {
        this.$refs.topScroll.scrollLeft = 0
      }
    },
    getIndex() {
      getFestival().then(res => {
        this.loadingflag = false
        if (res.code == 200) {
          // console.log(res)
          this.kace = res.data.fulika
          document.title = this.kace.title
          this.tabList = res.data.product_fen.filter(item=>item.product_list)
          if (this.tabList.length > 0) {
            this.active = this.tabList[0].id
          }
        }
      })
    }
  },
  created() {
    this.getIndex()
    document.title = ""
  },
  mounted() {
    window.addEventListener('scroll', this.topSearch);
    window.addEventListener('scroll', this.showSearch);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.topSearch, false);
    window.removeEventListener('scroll', this.showSearch, false);
  },
}
</script>

<style scoped lang="less">
.conPage {
  //background-color: #B3D7FB;
  min-height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
}

.option {
  //color: #4178AD;
  height: 43px;
  font-size: 17px;
  text-align: center;
  line-height: 45px;
  //background-color: #B3D7FB;
  width: 100%;
}

.option1 {
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 99;
}

.listMax {
  //padding: 10px;
  margin-top: -132px;

  .listMaxCon {
    position: relative;
    margin-top: 57px;
  }

  .titleBox {
    //background-image: url("../assets/xinlibao/icontitle.png");
    background-size: 100% 100%;
    width: 207px;
    height: 49px;
    margin: auto;
    position: relative;
    z-index: 1;
    color: #FDF7EE;
    font-size: 19px;
    padding-right: 30px;
    box-sizing: border-box;
    text-align: center;
    line-height: 52px;
    letter-spacing: 2px;
    //background-color: wheat;
  }

  .listBox {
    padding: 10px;
    position: relative;
    z-index: 5;
  }

  .cloud {
    position: absolute;
    bottom: -208px;
    left: 0;
  }

  .listItem {
    padding: 10px;
    border-radius: 15px;
    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5) inset;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 7px;
  }

  .shopList {
    width: 33%;
  }

  .listItem1 {
    margin-top: -24px;
    padding-top: 39px;
  }
}

.tabbar {
  background-color: #fff;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0px 12px;
  position: fixed;
  top: 43px;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 43px;
  box-sizing: border-box;

  .tabbarBox {
    display: flex;
    align-items: center;
    gap: 2px;
    height: 100%;
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
    font-size: 14px;
    //color: #727272;
    text-align: center;
    padding-top: 2px;
  }

  .tabBottom2 {
    padding: 3px 0px;
    width: 100%;
    margin: auto;
    //background-color: #3EA5FF;
    //color: #F1F8FF;
    border-radius: 30px;
  }
}


.tabbar::-webkit-scrollbar {
  display: none
}
</style>