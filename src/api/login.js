//此处用于存放所有登录相关的图形验证码

import request from "@/utils/request";

export const getPicCode = () => {
    return request.get('/captcha/image')
}

//获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
    return request.post('/captcha/sendSmsCaptcha', {
        form: {
            captchaCode,
            captchaKey,
            mobile
        }
    })
}

//登录接口
export const codeLogin = (mobile, smsCode) => {
    return request.post('/passport/login', {
        form: {
            isParty: false,
            mobile,
            partyData: {},
            smsCode
        }

    })
}