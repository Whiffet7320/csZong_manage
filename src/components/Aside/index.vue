<template>
  <div class="aside">
    <!-- <div class="nav4" @click="loginOut">
      <img class="pic1" src="../../assets/image/组191.png" alt="" />
      <div class="tit1">切换账号</div>
    </div>-->
    <div class="menu">
      <div class="myisCollBtn">
        <el-button @click="myisColl">
          <i class="el-icon-menu"></i>
        </el-button>
      </div>

      <el-menu
        :default-active="menuActiveIndex"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#001529"
        text-color="#fff"
        router
      >
        <!-- <el-menu-item :route="{ name: 'Shouye' }" index="1-1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>-->
        <el-submenu v-for="item in menu" :key="item.id" :index="item.menu_index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item
            v-for="item2 in item.sub_menu"
            :key="item2.id"
            :route="{ name: item2.url }"
            :index="item2.menu_index"
          >{{item2.name}}</el-menu-item>
        </el-submenu>
        <!-- 不显示 -->
        <template v-if="false">
          <el-submenu index="31">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商品</span>
            </template>
            <el-menu-item :route="{ name: 'Shangpingfenlei' }" index="31-1">商品分类</el-menu-item>
          </el-submenu>
          <el-submenu index="30">
            <template slot="title">
              <i class="el-icon-s-shop"></i>
              <span>场馆</span>
            </template>
            <el-menu-item :route="{ name: 'Mendianliebiao' }" index="30-1">门店管理</el-menu-item>
            <el-menu-item :route="{ name: 'Mendianshenhe' }" index="30-2">门店审核</el-menu-item>
          </el-submenu>
          <el-submenu index="32">
            <template slot="title">
              <i class="el-icon-s-help"></i>
              <span>圈子</span>
            </template>
            <el-menu-item :route="{ name: 'Quanziguanli' }" index="32-1">圈子管理</el-menu-item>
            <el-menu-item :route="{ name: 'Zhutiguanli' }" index="32-2">主题管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-promotion"></i>
              <span>战术/装备管理</span>
            </template>
            <el-menu-item :route="{ name: 'Zhanshuguanli' }" index="2-1">战术地图集管理</el-menu-item>
            <el-menu-item :route="{ name: 'Zhuangbeiguanli' }" index="2-11">装备管理</el-menu-item>
            <!-- <el-menu-item :route="{ name: 'Jifenshangpinguanli' }" index="2-5">积分商品管理</el-menu-item>
            <el-menu-item :route="{ name: 'Shangpingfenlei' }" index="2-2">商品分类</el-menu-item>
            <el-menu-item :route="{ name: 'Pingpailiebiao' }" index="2-10">品牌管理</el-menu-item>
            <el-menu-item :route="{ name: 'Yunfeimoban' }" index="2-4">运费模板</el-menu-item>-->
          </el-submenu>
          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单</span>
            </template>
            <el-menu-item :route="{ name: 'Dingdanguanli' }" index="3-1">订单管理</el-menu-item>
            <el-menu-item :route="{ name: 'ShopDingdanguanli' }" index="3-2">售后单列表</el-menu-item>
          </el-submenu>-->
          <el-submenu index="34">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span>提现</span>
            </template>
            <el-menu-item :route="{ name: 'Tixianguanli' }" index="34-1">提现管理</el-menu-item>
          </el-submenu>
          <el-submenu index="33">
            <template slot="title">
              <i class="el-icon-s-ticket"></i>
              <span>分销</span>
            </template>
            <el-menu-item :route="{ name: 'Tuijianrenliebiao' }" index="33-3">推荐人列表</el-menu-item>
            <el-menu-item :route="{ name: 'Yongjinliebiao' }" index="33-1">佣金列表</el-menu-item>
            <el-menu-item :route="{ name: 'Tuiguangchengyuan' }" index="33-2">推广成员管理</el-menu-item>
            <el-menu-item :route="{ name: 'Tuiguangdingdan' }" index="33-4">推广订单管理</el-menu-item>
            <el-menu-item :route="{ name: 'Tuiguangxiaoshoushuju' }" index="33-5">推广销售数据</el-menu-item>
            <el-menu-item :route="{ name: 'Fenchengbili' }" index="33-6">分成比例设置</el-menu-item>
            <!-- <el-menu-item :route="{ name: 'ShopDingdanguanli' }" index="33-2">售后单列表</el-menu-item> -->
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>用户</span>
            </template>
            <el-menu-item :route="{ name: 'Yonghuguanli' }" index="5-1">用户管理</el-menu-item>
            <el-menu-item :route="{ name: 'Shenheliebiao' }" index="5-5">用户审核管理</el-menu-item>
            <!-- <el-menu-item :route="{ name: 'Gongjinshangguanli' }" index="5-6">供应商管理</el-menu-item> -->
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>设置</span>
            </template>
            <el-menu-item :route="{ name: 'Logoguanli' }" index="8-1">LOGO管理</el-menu-item>
            <el-menu-item :route="{ name: 'Jifenshezhi' }" index="8-2">积分设置</el-menu-item>
            <!-- <el-menu-item :route="{ name: 'Tongzhiguanli' }" index="8-12">通知管理</el-menu-item> -->
            <el-menu-item :route="{ name: 'Lunbotushezhi' }" index="8-3">积分规则</el-menu-item>
            <el-menu-item :route="{ name: 'Zhucexieyi' }" index="8-9">注册协议</el-menu-item>
            <!-- <el-menu-item :route="{ name: 'Guanjianci' }" index="8-10">关键词设置</el-menu-item> -->
            <el-menu-item :route="{ name: 'Zhanghaoguanli' }" index="8-11">权限账号管理</el-menu-item>
            <el-menu-item :route="{ name: 'Lunbotuliebiao' }" index="8-4">轮播图列表</el-menu-item>
            <el-menu-item :route="{ name: 'Guanyuwomen' }" index="8-15">关于我们设置</el-menu-item>
            <!-- <el-menu-item :route="{ name: 'Kaipinyeshezhi' }" index="8-5">开屏页设置</el-menu-item> -->
            <!-- <el-menu-item :route="{ name: 'Shujuzhongxin' }" index="8-6">数据中心</el-menu-item> -->
          </el-submenu>
          <!-- <el-submenu index="10">
          <template slot="title">
            <i class="el-icon-s-finance"></i>
            <span>其他</span>
          </template>
          <el-menu-item :route="{ name: 'Jiangpingliebiao' }" index="10-5">奖品列表</el-menu-item>
          <el-menu-item :route="{ name: 'Zhongjiangliebiao' }" index="10-6">中奖列表</el-menu-item>
          <el-menu-item :route="{ name: 'Chengshiliebiao' }" index="10-2">城市列表</el-menu-item>
          <el-menu-item :route="{ name: 'Fankuiliebiao' }" index="10-1">反馈意见列表</el-menu-item>
          <el-menu-item :route="{ name: 'Gudingweizhi' }" index="10-3">固定位置列表</el-menu-item>
          <el-menu-item :route="{ name: 'Gudingweizhishangping' }" index="10-4">固定位置商品列表</el-menu-item>
          </el-submenu>-->
          <!-- <el-submenu index="11">
            <template slot="title">
              <i class="el-icon-s-finance"></i>
              <el-badge :is-dot="overallIsDot" class="item">
                <span>客服</span>
              </el-badge>
            </template>
            <el-menu-item :route="{ name: 'WebSocket' }" index="11-1">聊天室</el-menu-item>
          </el-submenu>-->
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["overallIsDot"])
  },
  created() {
    this.menu = JSON.parse(decodeURIComponent(sessionStorage.getItem("menu")));
    console.log(this.menu);
  },
  watch: {
    $route(to) {
      console.log(to.path, sessionStorage.getItem("toShouye")); //到哪去
      if (sessionStorage.getItem("toShouye") == "yes") {
        this.$router.push({ path: "/Shouye" });
        sessionStorage.setItem("toShouye", "no");
      }
      if (to.path == "/NotFound/NotFound404") {
        // this.menuActiveIndex = "1-1";
        // this.$store.commit("headerTit", "首页");
        this.menuActiveIndex = "";
        this.$store.commit(
          "headerTit",
          `无访问权限 / <span style="color: #515a61;
        font-weight: 700;">暂无权限/404</span>`
        );
      }
      if (to.path == "/Shouye") {
        // this.menuActiveIndex = "1-1";
        // this.$store.commit("headerTit", "首页");
        this.menuActiveIndex = "";
        this.$store.commit("headerTit", "");
      } else if (to.path == "/ZhanshuDitu/Zhanshuguanli") {
        this.menuActiveIndex = "2-1";
        this.$store.commit(
          "headerTit",
          `战术/地图 / <span style="color: #515a61;
        font-weight: 700;">战术地图集管理</span>`
        );
      } else if (to.path == "/Shangpin/Tianjiashangping") {
        this.$store.commit(
          "headerTit",
          `商品 / 商品管理 / <span style="color: #515a61;
        font-weight: 700;">添加/修改商品</span>`
        );
      } else if (to.path == "/Shangpin/Tianjiajifenshangping") {
        this.$store.commit(
          "headerTit",
          `商品 / 商品管理 / <span style="color: #515a61;
        font-weight: 700;">添加/修改积分商品</span>`
        );
      } else if (to.path == "/Shangpin/Shangpingfenlei") {
        this.menuActiveIndex = "2-2";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品分类</span>`
        );
      } else if (to.path == "/Shangpin/Shangpingpinglun") {
        this.menuActiveIndex = "2-3";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品评论</span>`
        );
      } else if (to.path == "/Shangpin/Yunfeimoban") {
        this.menuActiveIndex = "2-4";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">运费模板</span>`
        );
      } else if (to.path == "/Shangpin/Jifenshangpinguanli") {
        this.menuActiveIndex = "2-5";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">积分商品分类</span>`
        );
      } else if (to.path == "/Shangpin/Pingpailiebiao") {
        this.menuActiveIndex = "2-10";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">品牌管理</span>`
        );
      } else if (to.path == "/ZhanshuDitu/Zhuangbeiguanli") {
        this.menuActiveIndex = "2-11";
        this.$store.commit(
          "headerTit",
          `战术/地图 / <span style="color: #515a61;
        font-weight: 700;">装备管理</span>`
        );
      } else if (to.path == "/Dingdan/Dingdanguanli") {
        this.menuActiveIndex = "3-1";
        this.$store.commit(
          "headerTit",
          `订单 / <span style="color: #515a61;
        font-weight: 700;">服务订单管理</span>`
        );
      } else if (to.path == "/Dingdan/ShopDingdanguanli") {
        this.menuActiveIndex = "3-2";
        this.$store.commit(
          "headerTit",
          `订单 / <span style="color: #515a61;
        font-weight: 700;">售后单列表</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanshangping") {
        this.menuActiveIndex = "4-1-1";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团商品</span>`
        );
      } else if (to.path == "/Yingxiao/Tianjiapingtuanshangping") {
        this.menuActiveIndex = "4-1-1";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / 拼团商品 / <span style="color: #515a61;
        font-weight: 700;">添加/编辑商品</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanliebiao") {
        this.menuActiveIndex = "4-1-2";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团列表</span>`
        );
      } else if (to.path == "/Yingxiao/Jishouliebiao") {
        this.menuActiveIndex = "4-1-3";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">寄售列表</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanjilu") {
        this.menuActiveIndex = "4-1-4";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团记录</span>`
        );
      } else if (to.path == "/Yingxiao/Maichanghuodong") {
        this.menuActiveIndex = "4-2-1";
        this.$store.commit(
          "headerTit",
          `营销 / 卖场活动 / <span style="color: #515a61;
        font-weight: 700;">活动列表</span>`
        );
      } else if (to.path == "/Yonghu/Yonghuguanli") {
        this.menuActiveIndex = "5-1";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">用户管理</span>`
        );
      } else if (to.path == "/Yonghu/Shenheliebiao") {
        this.menuActiveIndex = "5-5";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">用户审核管理</span>`
        );
      } else if (to.path == "/Yonghu/Gongjinshangguanli") {
        this.menuActiveIndex = "5-6";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">供应商管理</span>`
        );
      } else if (to.path == "/Yonghu/Lianghaoliebiao") {
        this.menuActiveIndex = "5-2";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">靓号列表</span>`
        );
      } else if (to.path == "/Yonghu/Tixianliebiao") {
        this.menuActiveIndex = "5-3";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">提现列表</span>`
        );
      } else if (to.path == "/Yonghu/Shifuguanli") {
        this.menuActiveIndex = "5-4";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">师傅管理</span>`
        );
      } else if (to.path == "/Fenxiao/Fenxiaoshezhi") {
        this.menuActiveIndex = "6-1";
        this.$store.commit(
          "headerTit",
          `分销 / <span style="color: #515a61;
        font-weight: 700;">分销设置</span>`
        );
      } else if (to.path == "/Caiwu/Tixianshenqing") {
        this.menuActiveIndex = "7-1-1";
        this.$store.commit(
          "headerTit",
          `财务 / 财务操作 / <span style="color: #515a61;
        font-weight: 700;">提现申请</span>`
        );
      } else if (to.path == "/Caiwu/Yongjinjilu") {
        this.menuActiveIndex = "7-2-1";
        this.$store.commit(
          "headerTit",
          `财务 / 佣金记录 / <span style="color: #515a61;
        font-weight: 700;">佣金记录</span>`
        );
      } else if (to.path == "/Shezhi/Logoguanli") {
        this.menuActiveIndex = "8-1";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">LOGO管理</span>`
        );
      } else if (to.path == "/Shezhi/Jifenshezhi") {
        this.menuActiveIndex = "8-2";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">积分设置</span>`
        );
      } else if (to.path == "/Shezhi/Lunbotushezhi") {
        this.menuActiveIndex = "8-3";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">积分规则</span>`
        );
      } else if (to.path == "/Shezhi/Zhucexieyi") {
        this.menuActiveIndex = "8-9";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">注册协议</span>`
        );
      } else if (to.path == "/Shezhi/Guanjianci") {
        this.menuActiveIndex = "8-10";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">关键词设置</span>`
        );
      } else if (to.path == "/Shezhi/Zhanghaoguanli") {
        this.menuActiveIndex = "8-11";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">权限账号管理</span>`
        );
      } else if (to.path == "/Shezhi/Tongzhiguanli") {
        this.menuActiveIndex = "8-12";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">通知管理</span>`
        );
      } else if (to.path == "/Shezhi/Lunbotuliebiao") {
        this.menuActiveIndex = "8-4";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">轮播图列表</span>`
        );
      } else if (to.path == "/Shezhi/Kaipinyeshezhi") {
        this.menuActiveIndex = "8-5";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">开屏页设置</span>`
        );
      } else if (to.path == "/Shezhi/Shujuzhongxin") {
        this.menuActiveIndex = "8-6";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">数据中心</span>`
        );
      } else if (to.path == "/Shezhi/Chengshiliebiao") {
        this.menuActiveIndex = "8-7";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">城市列表</span>`
        );
      } else if (to.path == "/Wenzhang/Wenzhangliebiao") {
        this.menuActiveIndex = "9-1";
        this.$store.commit(
          "headerTit",
          `文章 / <span style="color: #515a61;
        font-weight: 700;">文章列表</span>`
        );
      } else if (to.path == "/Wenzhang/Tianjiawenzhang") {
        this.$store.commit(
          "headerTit",
          `文章 / 文章列表 / <span style="color: #515a61;
        font-weight: 700;">添加/修改文章</span>`
        );
      } else if (to.path == "/Qita/Fankuiliebiao") {
        this.menuActiveIndex = "10-1";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">反馈意见列表</span>`
        );
      } else if (to.path == "/Qita/Chengshiliebiao") {
        this.menuActiveIndex = "10-2";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">城市列表</span>`
        );
      } else if (to.path == "/Qita/Gudingweizhi") {
        this.menuActiveIndex = "10-3";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">固定位置列表</span>`
        );
      } else if (to.path == "/Qita/Gudingweizhishangping") {
        this.menuActiveIndex = "10-4";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">固定位置商品列表</span>`
        );
      } else if (to.path == "/Qita/Jiangpingliebiao") {
        this.menuActiveIndex = "10-5";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">奖品列表</span>`
        );
      } else if (to.path == "/Qita/Zhongjiangliebiao") {
        this.menuActiveIndex = "10-6";
        this.$store.commit(
          "headerTit",
          `其他 / <span style="color: #515a61;
        font-weight: 700;">中奖列表</span>`
        );
      } else if (to.path == "/Kefu/WebSocket") {
        this.menuActiveIndex = "11-1";
        this.$store.commit(
          "headerTit",
          `客服 / <span style="color: #515a61;
        font-weight: 700;">聊天室</span>`
        );
      } else if (to.path == "/Changguan/Mendianliebiao") {
        this.menuActiveIndex = "30-1";
        this.$store.commit(
          "headerTit",
          `场馆 / <span style="color: #515a61;
        font-weight: 700;">门店管理</span>`
        );
      } else if (to.path == "/Changguan/Mendianshenhe") {
        this.menuActiveIndex = "30-2";
        this.$store.commit(
          "headerTit",
          `场馆 / <span style="color: #515a61;
        font-weight: 700;">门店审核</span>`
        );
      } else if (to.path == "/Shangping/Shangpingfenlei") {
        this.menuActiveIndex = "31-1";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品分类</span>`
        );
      } else if (to.path == "/Quanzi/Quanziguanli") {
        this.menuActiveIndex = "32-1";
        this.$store.commit(
          "headerTit",
          `圈子 / <span style="color: #515a61;
        font-weight: 700;">圈子管理</span>`
        );
      } else if (to.path == "/Quanzi/Zhutiguanli") {
        this.menuActiveIndex = "32-2";
        this.$store.commit(
          "headerTit",
          `圈子 / <span style="color: #515a61;
        font-weight: 700;">主题管理</span>`
        );
      } else if (to.path == "/Fenxiao/Yongjinliebiao") {
        this.menuActiveIndex = "33-1";
        this.$store.commit(
          "headerTit",
          `分销 / <span style="color: #515a61;
        font-weight: 700;">佣金列表</span>`
        );
      } else if (to.path == "/Fenxiao/Tuiguangchengyuan") {
        this.menuActiveIndex = "33-2";
        this.$store.commit(
          "headerTit",
          `分销 / <span style="color: #515a61;
        font-weight: 700;">推广成员管理</span>`
        );
      } else if (to.path == "/Fenxiao/Tuijianrenliebiao") {
        this.menuActiveIndex = "33-3";
        this.$store.commit(
          "headerTit",
          `分销 / <span style="color: #515a61;
        font-weight: 700;">推荐人列表</span>`
        );
      } else if (to.path == "/Fenxiao/Tuiguangdingdan") {
        this.menuActiveIndex = "33-4";
        this.$store.commit(
          "headerTit",
          `分销 / <span style="color: #515a61;
        font-weight: 700;">推广订单管理</span>`
        );
      } else if (to.path == "/Fenxiao/Tuiguangxiaoshoushuju") {
        this.menuActiveIndex = "33-5";
        this.$store.commit(
          "headerTit",
          `分销 / <span style="color: #515a61;
        font-weight: 700;">推广销售数据</span>`
        );
      } else if (to.path == "/Fenxiao/Fenchengbili") {
        this.menuActiveIndex = "33-6";
        this.$store.commit(
          "headerTit",
          `分销 / <span style="color: #515a61;
        font-weight: 700;">分成比例设置</span>`
        );
      } else if (to.path == "/Tixian/Tixianguanli") {
        this.menuActiveIndex = "34-1";
        this.$store.commit(
          "headerTit",
          `提现 / <span style="color: #515a61;
        font-weight: 700;">提现管理</span>`
        );
      } else if (to.path == "/Shezhi/Guanyuwomen") {
        this.menuActiveIndex = "8-15";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">关于我们设置</span>`
        );
      }
    }
  },
  data() {
    return {
      menu: [],
      activeIndex: 0,
      menuActiveIndex: "",
      userInfo: null,
      isCollapse: false
    };
  },
  methods: {
    myisColl() {
      this.isCollapse = !this.isCollapse;
    },
    loginOut() {
      sessionStorage.setItem("token", null);
      sessionStorage.setItem("isLogin", null);
      this.$router.go(0);
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss" scoped>
.aside {
  .menu {
    /deep/ .el-menu {
      border-right: 0px;
    }
    /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
    .myisCollBtn {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
/deep/ .el-badge.item {
  sup {
    transform: translate(20px, 14px);
  }
}
</style>