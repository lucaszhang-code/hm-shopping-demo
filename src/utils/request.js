import axios from "axios";
import {Toast} from "vant";

//创建axios实例，将来对创建出来的实例，进行自定义配置
const instance = axios.create({
    baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
    timeout: 5000,
})

//自定义配置 -请求相应拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //开启loading，禁止点击背景 防止多次无效触发
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0 //不会自动消失
    });

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么(默认axios会多包装一层data，需要相应拦截器中处理一下)
    const res = response.data
    //错误情况 Toast是单例模式，后面的toast调用了，会将前一个toast效果覆盖
    if (res.status !== 200) {
        //给提示
        Toast(res.message)
        //抛出一个错误的promise
        return Promise.reject(res.message)
    } else {
        //正确情况
        Toast.clear()
    }
    return res;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

//导出实例
export default instance