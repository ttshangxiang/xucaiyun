import axios from 'axios';

// 全局配置
axios.defaults.baseURL = '/t2/xucaiyun';
axios.defaults.headers['Content-Type'] = 'application/json';

export default function (params: any) {
  return axios(params)
    // .then(response => {
    //   if (response.status !== 200) {
    //     return new Error(response.);
    //   }
    // })
    // .catch(error => console.log(error));
}
