import axios from 'axios';
import { Message, Loading } from 'element-ui';
import router from './router'

let loading;
function startLoading(){
    loading = Loading.service({
        lock: true,
        text: '拚了老命加載中...',
        background: 'rgba(0,0,0,0,7)'
    });
}

function endLoading(){
    loading.close();
}

// 請求攔截
axios.interceptors.request.use(config => {
    // 加載動畫
    startLoading();

    // 設置統一個請求header
    if(localStorage.eleToken){
        config.headers.Authorization = localStorage.eleToken;
    }

    return config;
}, err => {
    return Promise.reject(err);
})

// 響應攔截
axios.interceptors.response.use(res => {
    // 結束加載動畫
    endLoading();
    return res;
}, err => {
    // 錯誤提醒
    endLoading();
    Message.error({
        message:'請求失敗'
    });

    // 獲取錯誤狀態碼
    const { status } = err.response;
    if(status == 401) {
        // 表示token已經失效
        Message.error('token失效,請從新登入');
        localStorage.removeItem('eleToekn');
        // 跳轉到登入頁面
        router.push('/login');
    }

    return Promise.reject(err)
})

export default axios;