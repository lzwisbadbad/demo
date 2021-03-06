/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint no-console: "off" */
import qs from 'qs'
import { getFromLocal } from '~/utils/auth'
import { notification } from 'ant-design-vue'
import { Promise } from 'q'
import { Base64 } from 'js-base64'

export default function({ $axios, redirect, store }) {
    $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', ['post'])
    $axios.onRequest(config => {
        const Authorization = store.state.Authorization
        const Language = getFromLocal('Language') || store.state.locale
        if (Authorization) {
            // config.headers.Auth = Authorization
            // config.headers.Language = Language
        }
    })
    $axios.onResponse(response => {
        console.log(response, 'res')
        let rdata = response.data
        if (rdata && rdata.result) {
            try {
                return rdata.result
                    // JSON.parse(Base64.decode(rdata.result.deliver_tx.data))
            } catch (e) {
                return Promise.reject(rdata)
            }
        }
        return Promise.reject(rdata)
    })
    $axios.onError(error => {
        // const code = parseInt(error.response && error.response.status)
        // if (code === 401) {
        //     store.commit('SET_USER', '', true)
        //     redirect(store.getters.loginUrl)
        // }
        // console.log('onError：', error)
    })

    // $axios.onRequestError(error => {
    //     console.log('onRequestError', error)
    // })

    $axios.onResponseError(error => {
        // console.log('onResponseError', error)
        // const code = parseInt(error.response && error.response.status)
        // let message, description
        // if (code) {
        //     message = '请求异常'
        //     description = code == 401 ? '登录失效，请重新登录' : '错误码: ' + code
        // } else {
        //     message = '异常提示'
        //     description = error.message || '未知错误'
        // }
        // process.client &&
        //     notification.error({
        //         key: code,
        //         message,
        //         description
        //     })
    })
    let urlhost = ''
    if (window.location.host == 'demo.bcbchain.io') {
        urlhost = 'https://test-earth.bcbchain.io'
    }
    $axios.$get = function(url, params) {
        return $axios.get(urlhost + url, { params })
    }

    $axios.$post = function(url, params) {
        return $axios.post(urlhost + url, params)
    }
}