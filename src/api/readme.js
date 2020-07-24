import { http, publicUrl } from '@/http'

/**
 * http.get(`${publicUrl}/xxxxx`, { 
 *   params{ 参数 }
 *   loading{ 全局loading, true开启，默认关闭 }
 *   selSucMsg{ 自定义成功提示，默认不提示 }
 *   selErrMsg{ 自定义失败提示，默认接口返回的提示 }
 *   fn{ 业务代码中传过来的函数，比如设置局部loading的显示与隐藏 }
 *   ...{ 其他与axios配置相同 }
 * })
 */

/**
 * http.post(`${publicUrl}/xxxxxx`, params { 参数 }, {
 *   loading{ 全局loading, true开启，默认关闭 }
 *   selSucMsg{ 自定义成功提示，默认不提示 }
 *   selErrMsg{ 自定义失败提示，默认接口返回的提示 }
 *   fn{ 业务代码中传过来的函数，比如设置局部loading的显示与隐藏 }
 *   ...{ 其他与axios配置相同 }
 * })
 */

// get例
const getExample = params => http.get(`${publicUrl}/xxx`, { 
  params,
  loading: true,
  selSucMsg: '自定义成功提示',
  selErrMsg: '自定义失败提示',
});

// post例
const postExample = (params, fn) => http.post(`${publicUrl}/xxx`, params, {
  fn: fn,
  loading: true,
  selSucMsg: '自定义成功提示',
  selErrMsg: '自定义失败提示',
});

export { 
  getExample,
  postExample
}