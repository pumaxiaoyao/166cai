<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <title>ECharts</title>
</head>
<body>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="height:400px"></div>
    <!-- ECharts单文件引入 -->
    <script src="/source/echart/dist/echarts.js"></script>
    <script type="text/javascript">
        // 路径配置
        require.config({
            paths: {
                echarts: '/source/echart/dist'
            }
        });
        
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('main')); 
                
                option = {
                	    tooltip : {
                	        trigger: 'axis'
                	    },
                	    legend: {
                	        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                	    },
                	    toolbox: {
                	        show : true,
                	        feature : {
                	            mark : {show: true},
                	            dataView : {show: true, readOnly: false},
                	            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                	            restore : {show: true},
                	            saveAsImage : {show: true}
                	        }
                	    },
                	    calculable : true,
                	    xAxis : [
                	        {
                	            type : 'category',
                	            boundaryGap : false,
                	            data : ['周一','周二','周三','周四','周五','周六','周日']
                	        }
                	    ],
                	    yAxis : [
                	        {
                	            type : 'value'
                	        }
                	    ],
                	    series : [
                	        {
                	            name:'邮件营销',
                	            type:'line',
                	            stack: '总量',
                	            data:[120, 132, 101, 134, 90, 230, 210]
                	        },
                	        {
                	            name:'联盟广告',
                	            type:'line',
                	            stack: '总量',
                	            data:[220, 182, 191, 234, 290, 330, 310]
                	        },
                	        {
                	            name:'视频广告',
                	            type:'line',
                	            stack: '总量',
                	            data:[150, 232, 201, 154, 190, 330, 410]
                	        },
                	        {
                	            name:'直接访问',
                	            type:'line',
                	            stack: '总量',
                	            data:[320, 332, 301, 334, 390, 330, 320]
                	        },
                	        {
                	            name:'搜索引擎',
                	            type:'line',
                	            stack: '总量',
                	            data:[820, 932, 901, 934, 1290, 1330, 1320]
                	        }
                	    ]
                	};
        
                // 为echarts对象加载数据 
                myChart.setOption(option); 
            }
        );
    </script>
</body>