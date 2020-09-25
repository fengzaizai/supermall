import Axios from 'axios'

export function request(config) {
  //创建axios的实例
  // return new Promise((resolve,reject) => {
  const instance = Axios.create({
    baseURL: 'https:/人家说不能暴露接口',
    timeout: 5000,
  })
  // return instance(config)

  instance.interceptors.request.use(config => {
    return config;
  },err => {
    // console.log(err);
  });
  //2.2响应拦截
  instance.interceptors.response.use(res => {
    return res.data;
  },err => {
    console.log(err);
  });
  return instance(config)
}

