<template>
  <div class="statistic-container">
    <!--  统计车辆的总数-->
    <el-card  class="car-static">
      <el-icon size="100"><Van /></el-icon >
      <div>车辆数：{{carCount}}辆</div>
    </el-card>
    <!--  统计订单数-->
    <el-card  class="orders-static">
      <el-icon size="100"><GoodsFilled /></el-icon>
      <div>订单数：{{orderCount}}</div>
    </el-card>
    <!--  统计品牌数-->
    <el-card  class="brand-static">
      <el-icon size="100"><Wallet /></el-icon>
      <div>品牌数：{{brandCount}}</div>
    </el-card>
    <!--  统计用户的注册量-->
    <el-card  class="brand-static">
      <el-icon size="100"><UserFilled /></el-icon>
      <div>用户注册量：{{userCount}}</div>
    </el-card>
  </div>
  <div class="static-tu">
    <!--  统计品牌的汽车的销售额-->
    <el-card class="brand-car-static">
      <h1>品牌汽车销售统计</h1>
      <div id="car-Daily" ref="carRef" style="width: 600px; height: 400px">
      </div>
    </el-card>
    <!--  统计订单的日销售量-->
    <el-card class="day-order-static">
      <h1>订单日销售统计</h1>
      <div id="order-Daily" ref="orderRef" style="width: 600px; height: 400px">
      </div>
    </el-card>
  </div>

</template>

<script setup lang="ts">
import {GoodsFilled, UserFilled, Van, Wallet} from "@element-plus/icons-vue";
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
import {
  getBrandNumbers,
  getCarNumbers,
  getOrderNumbers,
  getSalesByBrand,
  getSalesByOrder, getUserNumbers
} from "@/api/staticsController.ts";
import SalesByBrandVo = API.SalesByBrandVo;
import SalesByOrderVo = API.SalesByOrderVo;
const orderRef = ref<HTMLElement | null>(null);
const carRef = ref<HTMLElement | null>(null);
let myChart: echarts.ECharts | null = null;
const carCount=ref();
const orderCount=ref();
const brandCount=ref();
const userCount=ref();
// 初始化页面要展示的数据
const initData=async ()=>{
  const CarRes=await getCarNumbers();
  if (CarRes.data.code==2000)
  {
    carCount.value=CarRes.data.data;
  }else {
    carCount.value=0;
  }
  const orderRes=await getOrderNumbers();
  if (orderRes.data.code==2000)
  {
    orderCount.value=orderRes.data.data;
  }else {
    orderCount.value=0;
  }
  const brandRes=await getBrandNumbers();
  if (brandRes.data.code==2000)
  {
    brandCount.value=brandRes.data.data;
  }else {
    brandCount.value=0;
  }
  const userRes=await getUserNumbers();
  if (userRes.data.code==2000)
  {
    userCount.value=userRes.data.data;
  }else {
    userCount.value=0;
  }
}
// 记录品牌汽车的销售额
const salesByBrandVo=ref<SalesByBrandVo[]>([]);
const brandData=ref<Record<number, string>[]>([]);
// 获取每个品牌的汽车销售额
const getBrandCarSales=async ()=>{
    const res= await getSalesByBrand();
    if (res.data.code==2000)
    {
      salesByBrandVo.value=res.data.data as SalesByBrandVo[];
      // 将数据进行转化
      brandData.value=salesByBrandVo.value.map(item=>{
         return{
           value:item.carSales,
           name:item.brandName
         }
      }) as Record<number, string>[];
    }
}
// 记录订单的日销售数据
const orderSales=ref<SalesByOrderVo[]>([]);
const orderData=ref<string[]>([])
const orderNumber=ref<number[]>([])
// 获取订单的日销售统计
const getOrderSales=async ()=>{
  const res=await getSalesByOrder();
  if (res.data.code==2000)
  {
    orderSales.value=res.data.data as SalesByOrderVo[];
    orderSales.value.map(item=>{
       orderData.value.push(item.day as string);
       orderNumber.value.push(item.orderCount as number);
    })
  }
}
onMounted(async ()=>{
  await initData();
  await getBrandCarSales();
  await getOrderSales()
  if (orderRef.value)
  {
    myChart=echarts.init(orderRef.value);
   const option = {
      xAxis: {
        type: 'category',
        data: orderData.value
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: orderNumber.value,
          type: 'line',
          smooth:true
        }
      ]
    };
    myChart.setOption(option);
  }
  if (carRef.value)
  {
    console.log(brandData.value);
    myChart=echarts.init(carRef.value);
  const  option = {
      title: {
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data:brandData.value,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);

  }
})



</script>

<style>
.day-order-static{
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  height:600px
}
.brand-car-static{
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  height:600px
}
.static-tu{
  display: flex;
  justify-content: space-between;
}
.car-static{
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  height: 200px
}
.orders-static{
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  height: 200px
}
.brand-static{
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  height: 200px
}
.statistic-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
:deep(.el-card__body){
  padding: 0;

}
.el-card{
  --el-card-padding: 0px;
}
</style>