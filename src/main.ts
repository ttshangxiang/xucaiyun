
import route from './route'
import axios from 'axios'

// 全局配置
axios.defaults.baseURL = '/t2/xucaiyun';
axios.defaults.headers['Content-Type'] = 'application/json'

document.body.append(route)
