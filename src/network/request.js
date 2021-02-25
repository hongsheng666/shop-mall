import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout:5000
  })
  // 响应拦截
  instance.interceptors.response.use(res => {
    // 只需要返回结果的数据就行
    return res.data
  }, err => {
    console.log(err);
  })
  return instance(config)
}