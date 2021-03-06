import axios from 'axios';
import { 
  successMsg,
  errorMsg,
  openLoading,
  closeLoading
 } from '@/elementui';

let http = null;
let selFn = null;
let pendingArr = [];
let selErrMsg = null;
let selSucMsg = null;
let showStatus = null;
let addPendingArr = null;
let publicUrl = '/hccloud';
let removePendingArr = null;

// 收集发起的请求
addPendingArr = beforeUrl => pendingArr.push(beforeUrl);

// 删除完成的请求
removePendingArr = response => {
  const finishUrl = response.config.baseURL + response.config.url;
  const finishParams = response.config.params ? response.config.params : response.config.data;
  const finishObj = JSON.stringify({
    url: finishUrl,
    params: finishParams
  })
  pendingArr.splice(pendingArr.indexOf(finishObj), 1);
}

// 状态提示函数
showStatus = status => ({
  400: '请求错误 (400)',
  401: '未授权，请重新登录 (401)',
  403: '拒绝访问 (403)',
  404: '请求出错 (404)',
  408: '请求超时 (408)',
  500: '服务器错误 (500)',
  501: '服务未实现 (501)',
  502: '网络错误 (502)',
  503: '服务不可用 (503)',
  504: '网络超时 (504)',
  505: 'HTTP版本不受支持 (505)'
})[status] || `连接出错${ status }`;

// 创建axios实例
http = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : '/',
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  timeout: 60000*2
});

// 请求拦截器
http.interceptors.request.use( config => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  config.cancelToken = source.token;
  // 先判断该请求是否在正在请求的数组中
  const pendingUrl = config.baseURL + config.url;
  const pendingParams = config.params ? config.params : config.data;
  const pendingObj = JSON.stringify({
    url: pendingUrl,
    params: pendingParams
  })
  pendingArr.indexOf(pendingObj) > -1 ? source.cancel() : addPendingArr(pendingObj);
  // 请求发送前，判断是否自定义code不为0的情况的提示信息
  config.fn ? selFn = config.fn : selFn = null;
  config.loading ? openLoading() : false;
  config.selErrMsg ? selErrMsg = config.selErrMsg : selErrMsg = null;
  config.selSucMsg ? selSucMsg = config.selSucMsg : selSucMsg = null;
  return config;
});

// 响应拦截器
http.interceptors.response.use( response => {
  // 请求成功，将该请求从正在请求的数组中删除
  removePendingArr(response);
  // 关闭loading
  response.config.loading ? closeLoading() : null;
  selFn ? selFn() : null;
  const { data } = response;
  if (data.code === '0000') {
    // 状态码code为0，表示拿到正确数据，判断是否显示提示
    selSucMsg ? successMsg(selSucMsg) : false;
    return response;
  } else {
    // 状态码不为0，表示拿到错误数据，判断显示自定义或默认提示
    selErrMsg ? errorMsg(selErrMsg) : errorMsg(data.msg);
    return Promise.reject(data)
  }
}, error => {
  const { response } = error;
  // 请求失败，将该请求从正在请求的数组中删除
  removePendingArr(response);
  // 关闭loading
  response.config.loading ? closeLoading() : null;
  selFn ? selFn() : null;
  errorMsg(showStatus(response.status));
  return Promise.reject('服务器错误!');
});

export {
  http,
  publicUrl
} 