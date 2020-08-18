import axios from 'axios'
import service from './contactApi'

// service 循环遍历输出不同的请求方法
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000
})
const Http = {} // 包裹请求方法的容器
// 请求格式/参数的统一
for (const key in service) {
  const api = service[key] // url, method
  // // async 作用：避免进入回掉地狱
  // // axios.get().then(res => {
  // //   axios.get().then(res => {
  // //   })
  // // }).catch(err => {})
  // Http[key] = async function () {
  //   // eslint-disable-next-line no-unused-vars
  //   let res = null
  //   try {
  //     res = await axios.get('url') // 异步函数，key值就是api中定义的key值，如getContactList
  //     // await获得res里的内容 ， catch获得上面catch里的内容
  //   } catch (err) {
  //     res = err
  //   }
  //   // 等待res 请求完成，再请求res2
  //   // const res = await axios.get('url') // 异步函数，key值就是api中定义的key值，如getContactList
  //   // const res2 = await axios.get('url') // 异步函数，key值就是api中定义的key值，如getContactList
  Http[key] = async function (
    // 参数：根据实际项目进行定义
    params, // 请求参数get：url，put，post,patch(data),delete:url
    isFormData = false, // 标识是否是form-data请求
    config = {} // 参数配置
  ) {
    // const url = api.url
    let newParams
    // content-type 是否是form-data的判断
    if (params && isFormData) {
      newParams = new FormData()
      // eslint-disable-next-line no-unused-vars
      for (const i in params) {
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }
    // 不同请求的判断
    let response = {}
    if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
      try {
        response = await instance[api.method](api.url, newParams, config)
        console.log('请求方法为post')
      } catch (e) {
        response = e
      }
      // eslint-disable-next-line no-unused-expressions
    } else if (api.method === 'delete' || api.method === 'get') {
      config.params = newParams
      console.log('请求方法为get、detele')
      try {
        response = await instance[api.method](api.url, config)
      } catch (e) {
        response = e
      }
    }
    return response
  }
}
// 拦截器的添加
// 请求拦截器
instance.interceptors.request.use(config => {
  // 发起请求前做什么
  // 提示，正在请求
  console.log('正在请求')
  return config
// eslint-disable-next-line handle-callback-err
}, err => {
  // 请求错误
  // 错误的提示：请求错误，请重新请求
})
// 响应拦截器
instance.interceptors.response.use(res => {
  // 请求成功，清除请求提示
  console.log('请求成功')
  return res.data
}, () => {
  // 请求失败，失败提示：请求错误，请重新请求
})

// 导出http
export default Http
