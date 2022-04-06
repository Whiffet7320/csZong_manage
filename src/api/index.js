import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8";
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
})
let myPut = axios.create({
    baseURL: urls.baseUrl,
    method: 'put',
})

myPut.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            // 'X-Token': sessionStorage.getItem("token"),
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myDelete.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            // 'X-Token': sessionStorage.getItem("token"),
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            // 'Access-Control-Allow-Origin': '*',
            // "access-control-allow-credentials": "true"
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            // 'X-Token': sessionStorage.getItem("token"),
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

myGet.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.response.use(response => {
    // console.log(response)
    if (response.status >= 200 && response.status <= 300) {
        return response
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.message);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        vue.$message.error(error.response.data.message);
    }
})
myGet.interceptors.response.use(response => {
    if (response.status >= 200 && response.status <= 300) {
        return response
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.message);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        vue.$message.error(error.response.data.message);
    }
})
myPut.interceptors.response.use(response => {
    // console.log(response)
    if (response.status >= 200 && response.status <= 300) {
        return response
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.message);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        vue.$message.error(error.response.data.message);
    }
})
myDelete.interceptors.response.use(response => {
    // console.log(response)
    if (response.status >= 200 && response.status <= 300) {
        return response
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.message);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        vue.$message.error(error.response.data.message);
    }
})

export default {
    login(obj) {
        return myPost({
            url: urls.login,
            data: {
                ...obj
            }
        })
    },
    tactics_list(obj) {
        return myPost({
            url: urls.tactics_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    add_tactics(obj) {
        return myPost({
            url: urls.add_tactics,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    store_list(obj) {
        return myPost({
            url: urls.store_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    store_setflag(obj) {
        return myPost({
            url: urls.store_setflag,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    store_setstatus(obj) {
        return myPost({
            url: urls.store_setstatus,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    storesettled_list(obj) {
        return myPost({
            url: urls.storesettled_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    storesettled_setstatus(obj) {
        return myPost({
            url: urls.storesettled_setstatus,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    applystore_info(obj) {
        return myPost({
            url: urls.applystore_info,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    store_superuser(obj) {
        return myPost({
            url: urls.store_superuser,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    store_engage(obj) {
        return myPost({
            url: urls.store_engage,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    user_list(obj) {
        return myPost({
            url: urls.user_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    goodsclassify_list(obj) {
        return myPost({
            url: urls.goodsclassify_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    setstatus_goodsclassify(obj) {
        return myPost({
            url: urls.setstatus_goodsclassify,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    add_goodsclassify(obj) {
        return myPost({
            url: urls.add_goodsclassify,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    edit_goodsclassify(obj) {
        return myPost({
            url: urls.edit_goodsclassify,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    del_goodsclassify(obj) {
        return myPost({
            url: urls.del_goodsclassify,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    swiper_list(obj) {
        return myPost({
            url: urls.swiper_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    add_swiper(obj) {
        return myPost({
            url: urls.add_swiper,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    swiper_setstatus(obj) {
        return myPost({
            url: urls.swiper_setstatus,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    edit_swiper(obj) {
        return myPost({
            url: urls.edit_swiper,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    swiper_delete(obj) {
        return myPost({
            url: urls.swiper_delete,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    logopic(obj) {
        return myPost({
            url: urls.logopic,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    edit_logopic(obj) {
        return myPost({
            url: urls.edit_logopic,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    edit_tactics(obj) {
        return myPost({
            url: urls.edit_tactics,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    del_tactics(obj) {
        return myPost({
            url: urls.del_tactics,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    equip_classify(obj) {
        return myPost({
            url: urls.equip_classify,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    equip_list(obj) {
        return myPost({
            url: urls.equip_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    del_equip(obj) {
        return myPost({
            url: urls.del_equip,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    setstatus_equip(obj) {
        return myPost({
            url: urls.setstatus_equip,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    circle_list(obj) {
        return myPost({
            url: urls.circle_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    del_circle(obj) {
        return myPost({
            url: urls.del_circle,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    circle_setgather(obj) {
        return myPost({
            url: urls.circle_setgather,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    integral_list(obj) {
        return myPost({
            url: urls.integral_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    operation_userintegral(obj) {
        return myPost({
            url: urls.operation_userintegral,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    commission_list(obj) {
        return myPost({
            url: urls.commission_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    userrecommend_list(obj) {
        return myPost({
            url: urls.userrecommend_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    recommenduserlower_list(obj) {
        return myPost({
            url: urls.recommenduserlower_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    recommendorders_list(obj) {
        return myPost({
            url: urls.recommendorders_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    recommendsale_list(obj) {
        return myPost({
            url: urls.recommendsale_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    proportion_list(obj) {
        return myPost({
            url: urls.proportion_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    add_proportion(obj) {
        return myPost({
            url: urls.add_proportion,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    del_proportion(obj) {
        return myPost({
            url: urls.del_proportion,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    realnamelist(obj) {
        return myPost({
            url: urls.realnamelist,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    examine_realnamesetstatus(obj) {
        return myPost({
            url: urls.examine_realnamesetstatus,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    theme_list(obj) {
        return myPost({
            url: urls.theme_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    setstatus_theme(obj) {
        return myPost({
            url: urls.setstatus_theme,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    add_theme(obj) {
        return myPost({
            url: urls.add_theme,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    edit_theme(obj) {
        return myPost({
            url: urls.edit_theme,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    del_theme(obj) {
        return myPost({
            url: urls.del_theme,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    withdrawal_list(obj) {
        return myPost({
            url: urls.withdrawal_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    withdrawal_setstatus(obj) {
        return myPost({
            url: urls.withdrawal_setstatus,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    system_view(obj) {
        return myPost({
            url: urls.system_view,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    system_set(obj) {
        return myPost({
            url: urls.system_set,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    integralrule_set(obj) {
        return myPost({
            url: urls.integralrule_set,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    agreementinfo(obj) {
        return myPost({
            url: urls.agreementinfo,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    registeragreement_set(obj) {
        return myPost({
            url: urls.registeragreement_set,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    about_info(obj) {
        return myPost({
            url: urls.about_info,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    edit_abouts(obj) {
        return myPost({
            url: urls.edit_abouts,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    limits(obj) {
        return myPost({
            url: urls.limits,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    adminuser_list(obj) {
        return myPost({
            url: urls.adminuser_list,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    add_adminuser(obj) {
        return myPost({
            url: urls.add_adminuser,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    update_adminuser(obj) {
        return myPost({
            url: urls.update_adminuser,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    adminuser_del(obj) {
        return myPost({
            url: urls.adminuser_del,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    adminuser_setstatusval(obj) {
        return myPost({
            url: urls.adminuser_setstatusval,
            data: {
                ...obj,
                token:sessionStorage.getItem("token"),
            }
        })
    },
    async upload_pic(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/upload_pic`, image, configs)
        return res
    },
}