// 重连尝试次数
import {ElNotification} from "element-plus";
import {ref} from "vue";
import useUserStore from "@/stores/userStore.ts";
const store=useUserStore();
const reconnectAttempts = ref(0);
// 最大重连尝试次数
const maxReconnectAttempts = 5;
// 重连时间间隔
const reconnectDelay = 1000;
// 定时器对象
let reconnectTimer: number | null = null;
export default function ()
{
    // 连接服务器函数
    const connectWebSocket=()=>{
        if(reconnectTimer)
        {
            clearInterval(reconnectTimer);
            reconnectTimer=null;
        }
        let ws=new WebSocket(`ws://localhost:8080/api/webSocket/${store.LoginUser.id}`);
        ws.addEventListener('message',(event)=>{
            receive(event.data);
        })
        ws.addEventListener('open',()=>{
            console.log("与服务端建立了连接");
            reconnectAttempts.value=0;
        })
        ws.addEventListener('close',()=>{
            handleReconnect();
        });
        ws.addEventListener('error',()=>{
            handleReconnect();
        });
        const handleReconnect=()=>{
            if (reconnectAttempts.value<maxReconnectAttempts)
            {
                reconnectAttempts.value++;
                const delay = reconnectDelay * Math.pow(2, reconnectAttempts.value - 1);

                console.log(`WebSocket 连接断开，${delay}ms 后尝试第 ${reconnectAttempts.value} 次重连`);

                reconnectTimer = window.setTimeout(() => {
                    connectWebSocket();
                }, delay);
            }else {
                console.log('达到最大重连次数，停止重连');
            }
        }
        const receive=(data:string)=>{
            ElNotification({
                title: '来单通知',
                message: data,
                duration: 0,
            })
        }
    }
   return {connectWebSocket}
}
