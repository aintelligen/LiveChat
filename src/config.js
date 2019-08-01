import axios from 'axios';
import { Toast } from 'antd-mobile';
/* 
axios.interceptors.request.use(function (config) {
  Toast.loading('加载中', 0);
  return config
})

axios.interceptors.response.use(function (config) {
  Toast.hide()
  return config
}) */

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    Toast.loading('加载中', 0);
    return config;
  },
  function(error) {
    Toast.hide();
    Toast.show('服务器开小差');
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    Toast.hide();
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    Toast.show('服务器开小差');
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
