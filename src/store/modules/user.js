import {getInfo} from "@/utils/storage";
import {setInfo} from "@/utils/storage";

export default {
    namespaced: true,
    state() {
        return {
            //个人权证相关
            userInfo: getInfo()
        }
    },
    mutations: {
        //所有mutation第一个参数都是state，第二个才是形参
        setUserInfo(state, obj) {
            state.userInfo = obj
            setInfo(obj)
        }
    },
    actions: {},
    getters: {}

}