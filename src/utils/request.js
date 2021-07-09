import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 500
})
// 请求拦截
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      //设置令牌请求头
      config.headers["Authorization"] = 'Beare ' + token
    }
    console.log(config)
    return config
  },
  error => {
    //请求错误预处理
    return Promise.reject(error)
  }
)
// 响应拦截
axios.interceptors.response.use(
  // 通过自定义code判断响应状态
  response => {
    // 返回数据部分
    const res = response.data
    if (res.code !== 1) {
      Message({
        message: res.message || "Error",
        type: 'error',
        duration: 5 * 1000
      })
    }
  }
)
export default axios