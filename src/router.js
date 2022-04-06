import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('./components/Home'),
    children: [{
        path: 'Shouye',
        name: 'Shouye',
        component: () => import('./components/Home/Shouye'),
    }, ]
}, {
    path: '/Quanzi',
    name: 'Quanzi',
    component: () => import('./components/Quanzi'),
    children: [{
        path: 'Quanziguanli',
        name: 'Quanziguanli',
        component: () => import('./components/Quanzi/Quanziguanli'),
    }, {
        path: 'Zhutiguanli',
        name: 'Zhutiguanli',
        component: () => import('./components/Quanzi/Zhutiguanli'),
    }, ]
}, {
    path: '/Tixian',
    name: 'Tixian',
    component: () => import('./components/Tixian'),
    children: [{
        path: 'Tixianguanli',
        name: 'Tixianguanli',
        component: () => import('./components/Tixian/Tixianguanli'),
    }, ]
}, {
    path: '/ZhanshuDitu',
    name: 'ZhanshuDitu',
    component: () => import('./components/ZhanshuDitu'),
    children: [{
        path: 'Zhanshuguanli',
        name: 'Zhanshuguanli',
        component: () => import('./components/ZhanshuDitu/Zhanshuguanli'),
    }, {
        path: 'Zhuangbeiguanli',
        name: 'Zhuangbeiguanli',
        component: () => import('./components/ZhanshuDitu/Zhuangbeiguanli'),
    }, ]
}, {
    path: '/Changguan',
    name: 'Changguan',
    component: () => import('./components/Changguan'),
    children: [{
        path: 'Mendianliebiao',
        name: 'Mendianliebiao',
        component: () => import('./components/Changguan/Mendianliebiao'),
    }, {
        path: 'Mendianshenhe',
        name: 'Mendianshenhe',
        component: () => import('./components/Changguan/Mendianshenhe'),
    }, ]
}, {
    path: '/Shangping',
    name: 'Shangping',
    component: () => import('./components/Shangping'),
    children: [{
        path: 'Shangpingfenlei',
        name: 'Shangpingfenlei',
        component: () => import('./components/Shangping/Shangpingfenlei'),
    }]
}, {
    path: '/Dingdan',
    name: 'Dingdan',
    component: () => import('./components/Dingdan'),
    children: [{
        path: 'Dingdanguanli',
        name: 'Dingdanguanli',
        component: () => import('./components/Dingdan/Dingdanguanli'),
    }, {
        path: 'ShopDingdanguanli',
        name: 'ShopDingdanguanli',
        component: () => import('./components/Dingdan/ShopDingdanguanli'),
    }]
}, {
    path: '/Wenzhang',
    name: 'Wenzhang',
    component: () => import('./components/Wenzhang'),
    children: [{
        path: 'Wenzhangliebiao',
        name: 'Wenzhangliebiao',
        component: () => import('./components/Wenzhang/Wenzhangliebiao'),
    }, {
        path: 'Tianjiawenzhang',
        name: 'Tianjiawenzhang',
        component: () => import('./components/Wenzhang/Tianjiawenzhang'),
    }]
}, {
    path: '/Yingxiao',
    name: 'Yingxiao',
    component: () => import('./components/Yingxiao'),
    children: [{
        path: 'Pingtuanshangping',
        name: 'Pingtuanshangping',
        component: () => import('./components/Yingxiao/Pingtuanshangping'),
    }, {
        path: 'Tianjiapingtuanshangping',
        name: 'Tianjiapingtuanshangping',
        component: () => import('./components/Yingxiao/Tianjiapingtuanshangping'),
    }, {
        path: 'Pingtuanliebiao',
        name: 'Pingtuanliebiao',
        component: () => import('./components/Yingxiao/Pingtuanliebiao'),
    }, {
        path: 'Maichanghuodong',
        name: 'Maichanghuodong',
        component: () => import('./components/Yingxiao/Maichanghuodong'),
    }, {
        path: 'Jishouliebiao',
        name: 'Jishouliebiao',
        component: () => import('./components/Yingxiao/Jishouliebiao'),
    }, {
        path: 'Pingtuanjilu',
        name: 'Pingtuanjilu',
        component: () => import('./components/Yingxiao/Pingtuanjilu'),
    }, ]
}, {
    path: '/Yonghu',
    name: 'Yonghu',
    component: () => import('./components/Yonghu'),
    children: [{
        path: 'Yonghuguanli',
        name: 'Yonghuguanli',
        component: () => import('./components/Yonghu/Yonghuguanli'),
    }, {
        path: 'Gongjinshangguanli',
        name: 'Gongjinshangguanli',
        component: () => import('./components/Yonghu/Gongjinshangguanli'),
    }, {
        path: 'Shenheliebiao',
        name: 'Shenheliebiao',
        component: () => import('./components/Yonghu/Shenheliebiao'),
    }, {
        path: 'Shifuguanli',
        name: 'Shifuguanli',
        component: () => import('./components/Yonghu/Shifuguanli'),
    }, {
        path: 'Lianghaoliebiao',
        name: 'Lianghaoliebiao',
        component: () => import('./components/Yonghu/Lianghaoliebiao'),
    }, {
        path: 'Tixianliebiao',
        name: 'Tixianliebiao',
        component: () => import('./components/Yonghu/Tixianliebiao'),
    }]
}, {
    path: '/Fenxiao',
    name: 'Fenxiao',
    component: () => import('./components/Fenxiao'),
    children: [{
        path: 'Fenxiaoshezhi',
        name: 'Fenxiaoshezhi',
        component: () => import('./components/Fenxiao/Fenxiaoshezhi'),
    }, {
        path: 'Yongjinliebiao',
        name: 'Yongjinliebiao',
        component: () => import('./components/Fenxiao/Yongjinliebiao'),
    }, {
        path: 'Tuiguangchengyuan',
        name: 'Tuiguangchengyuan',
        component: () => import('./components/Fenxiao/Tuiguangchengyuan'),
    }, {
        path: 'Tuijianrenliebiao',
        name: 'Tuijianrenliebiao',
        component: () => import('./components/Fenxiao/Tuijianrenliebiao'),
    }, {
        path: 'Tuiguangdingdan',
        name: 'Tuiguangdingdan',
        component: () => import('./components/Fenxiao/Tuiguangdingdan'),
    }, {
        path: 'Tuiguangxiaoshoushuju',
        name: 'Tuiguangxiaoshoushuju',
        component: () => import('./components/Fenxiao/Tuiguangxiaoshoushuju'),
    }, {
        path: 'Fenchengbili',
        name: 'Fenchengbili',
        component: () => import('./components/Fenxiao/Fenchengbili'),
    }, ]
}, {
    path: '/Caiwu',
    name: 'Caiwu',
    component: () => import('./components/Caiwu'),
    children: [{
        path: 'Tixianshenqing',
        name: 'Tixianshenqing',
        component: () => import('./components/Caiwu/Tixianshenqing'),
    }, {
        path: 'Yongjinjilu',
        name: 'Yongjinjilu',
        component: () => import('./components/Caiwu/Yongjinjilu'),
    }, ]
}, {
    path: '/Qita',
    name: 'Qita',
    component: () => import('./components/Qita'),
    children: [{
        path: 'Fankuiliebiao',
        name: 'Fankuiliebiao',
        component: () => import('./components/Qita/Fankuiliebiao'),
    }, {
        path: 'Chengshiliebiao',
        name: 'Chengshiliebiao',
        component: () => import('./components/Qita/Chengshiliebiao'),
    }, {
        path: 'Gudingweizhi',
        name: 'Gudingweizhi',
        component: () => import('./components/Qita/Gudingweizhi'),
    }, {
        path: 'Gudingweizhishangping',
        name: 'Gudingweizhishangping',
        component: () => import('./components/Qita/Gudingweizhishangping'),
    }, {
        path: 'Jiangpingliebiao',
        name: 'Jiangpingliebiao',
        component: () => import('./components/Qita/Jiangpingliebiao'),
    }, {
        path: 'Zhongjiangliebiao',
        name: 'Zhongjiangliebiao',
        component: () => import('./components/Qita/Zhongjiangliebiao'),
    }, ]
}, {
    path: '/Shezhi',
    name: 'Shezhi',
    component: () => import('./components/Shezhi'),
    children: [{
        path: 'Xiaoxiguanli',
        name: 'Xiaoxiguanli',
        component: () => import('./components/Shezhi/Xiaoxiguanli'),
    }, {
        path: 'Zhanghaoguanli',
        name: 'Zhanghaoguanli',
        component: () => import('./components/Shezhi/Zhanghaoguanli'),
    }, {
        path: 'Guanjianci',
        name: 'Guanjianci',
        component: () => import('./components/Shezhi/Guanjianci'),
    }, {
        path: 'Jifenshezhi',
        name: 'Jifenshezhi',
        component: () => import('./components/Shezhi/Jifenshezhi'),
    }, {
        path: 'Lunbotushezhi',
        name: 'Lunbotushezhi',
        component: () => import('./components/Shezhi/Lunbotushezhi'),
    }, {
        path: 'Lunbotuliebiao',
        name: 'Lunbotuliebiao',
        component: () => import('./components/Shezhi/Lunbotuliebiao'),
    }, {
        path: 'Kaipinyeshezhi',
        name: 'Kaipinyeshezhi',
        component: () => import('./components/Shezhi/Kaipinyeshezhi'),
    }, {
        path: 'Shujuzhongxin',
        name: 'Shujuzhongxin',
        component: () => import('./components/Shezhi/Shujuzhongxin'),
    }, {
        path: 'Fapiaoguize',
        name: 'Fapiaoguize',
        component: () => import('./components/Shezhi/Fapiaoguize'),
    }, {
        path: 'Tongzhiguanli',
        name: 'Tongzhiguanli',
        component: () => import('./components/Shezhi/Tongzhiguanli'),
    }, {
        path: 'Logoguanli',
        name: 'Logoguanli',
        component: () => import('./components/Shezhi/Logoguanli'),
    }, {
        path: 'Zhucexieyi',
        name: 'Zhucexieyi',
        component: () => import('./components/Shezhi/Zhucexieyi'),
    }, {
        path: 'Guanyuwomen',
        name: 'Guanyuwomen',
        component: () => import('./components/Shezhi/Guanyuwomen'),
    }]
}, {
    path: '/Kefu',
    name: 'Kefu',
    component: () => import('./components/Kefu'),
    children: [{
        path: 'WebSocket',
        name: 'WebSocket',
        component: () => import('./components/Kefu/WebSocket'),
    }]
}, {
    path: '/NotFound',
    name: 'NotFound',
    component: () => import('./components/NotFound'),
    children: [{
        path: 'NotFound404',
        name: 'NotFound404',
        component: () => import('./components/NotFound/404'),
    }]
}, ]

const router = new VueRouter({
    mode: 'hash',
    routes,
})


export default router