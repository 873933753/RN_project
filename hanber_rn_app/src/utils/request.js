import urlcat from 'urlcat';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

/* 封装fetch */
const request = async (url, { method = 'GET', params, body }) => {
  const requestUrl = urlcat(API_URL, url, params); // 主要get请求需要拼接参数，其他请求不需要

  // 请求头
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // token
  };

  const config = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined, //fetch传递的数据要将json对象转换成字符串，后端才能正确解析
  };

  const response = await fetch(requestUrl, config);

  if (!response.ok) {
    const { message, errors } = await response.json().catch(() => null);
    const error = new Error(message || '请求失败');
    error.status = response.status;
    error.errors = errors;
    throw error;
  }

  return await response.json();
};

export default request;

/* GET  请求 */
export const get = (url, params) => request(url, { method: 'GET', params });

/* POST 请求 */
export const post = (url, body) => request(url, { method: 'POST', body });

/* PUT 请求 */
export const put = (url, body) => request(url, { method: 'PUT', body });

/* DELETE 请求 */
export const del = (url, body) => request(url, { method: 'DELETE', body });

/* PATCH */
export const patch = (url, body) => request(url, { method: 'PATCH', body });
