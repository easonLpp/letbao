 $(function () {
   // 基于准备好的dom，初始化echarts实例
   var echast_left = echarts.init(document.querySelector('.echast_left'));
   // 指定图表的配置项和数据
   var option = {
     // 标题
     title: {
       // 标题文本
       text: '2018年注册人数'
     },
     // 提示框组件
     tooltip: {},
     //  图例
     legend: {
       data: ['销量', '人数']
     },
     //  x轴
     xAxis: {
       data: ["1月", "2月", "3月", "4月", "5月", "6月"]
     },
     //  y轴，y轴数据刻度。需要通过数据的值，动态渲染
     yAxis: {},
     series: [{
         name: '销量',
         type: 'bar', //bar:柱状图，line：折线图，pie：饼状图
         data: [5, 20, 36, 10, 20, 20]
       },
       {
         name: '人数',
         type: 'bar', //bar:柱状图，line：折线图，pie：饼状图
         data: [5, 24, 76, 10, 80, 30]
       }
     ]
   };

   // 使用刚指定的配置项和数据显示图表。
   echast_left.setOption(option);

   //  饼图
   // 基于准备好的dom，初始化echarts实例
   var echast_right = echarts.init(document.querySelector('.echast_right'));
   // 指定图表的配置项和数据
   var option = {
     title: {
       //  主标题文本       
       text: '热门品牌销售',
       //  副标题文本
       subtext: '2018年11月',
       //  水平居中
       x: 'center',
       //  主标题文本样式
       textStyle: {
         fontsize: 30,
         color: "#e92322"
       }
     },
     //  提示框组件
     tooltip: {
       //  鼠标悬停在数据上时触发
       trigger: 'item',
       // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
       formatter: "{a} <br/>{b} : {c} ({d}%)"
     },
     //  图例
     legend: {
       //  垂直：vertical，水平：horizontal
       orient: 'vertical',
       left: 'left',
       data: ['耐克', '阿迪', '老太太', '老北京', '回力']
     },
     //  系列列表
     series: [{
       name: '热门品牌', //系列名称
       type: 'pie', //饼状图
       //  圆的大小
       radius: '55%',
       //  圆心的位置
       center: ['50%', '60%'],
       data: [{
           value: 335,
           name: '耐克'
         },
         {
           value: 310,
           name: '阿迪'
         },
         {
           value: 234,
           name: '老太太'
         },
         {
           value: 135,
           name: '老北京'
         },
         {
           value: 1548,
           name: '回力'
         }
       ],
       //  额为的阴影效果
       itemStyle: {
         emphasis: {
           shadowBlur: 10,
           shadowOffsetX: 0,
           shadowColor: 'rgba(0, 0, 0, 0.5)'
         }
       }
     }]
   };
   // 使用刚指定的配置项和数据显示图表。
   echast_right.setOption(option);
 })