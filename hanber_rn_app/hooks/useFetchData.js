import { useEffect, useState } from 'react';
import { request, get } from '../utils/request';

/* 自定义hook */
export default function useFetchData ( url, params ) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null); 
    await new Promise(resolve => setTimeout(resolve, 500)); // 模拟网络请求延迟
    try {
      const response = await get(url, params);
      setData(response?.data ?? response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    } 
  };

  /* 重新加载 */
  const onReload = async () => {
    setLoading(true);
    setError(null);
    await fetchData();
  }

  /* 
    当依赖参数是一个对象或者引用类型时，直接放在依赖数组中会导致无限循环，因为每次渲染都会创建一个新的对象引用。
    解决方法是将对象转换成字符串，或者使用useMemo来缓存对象引用。
  */
  useEffect(() => {
    fetchData();
  }, [url]); // 依赖项改变时重新获取数据
  // JSON.stringify(params)

  return { data, loading, error, setData, onReload };
}