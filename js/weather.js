const myChart = echarts.init(e('#weather'))

// 指定图表的配置项和数据
const option = {
    title: {
        text: '沈阳天气预报',
        subtext: '三日内气温'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['最高气温', '最低气温']
    },
    toolbox: {
        show: false,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} °C'
        }
    },
    series: [
        {
            name: '最高气温',
            type: 'line',
            data: [11, 11, 15],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            }
        },
        {
            name: '最低气温',
            type: 'line',
            data: [1, -2, 2],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            markLine: {
                data: [
                    [{
                        symbol: 'none',
                        x: '90%',
                        yAxis: 'max'
                    }, {
                        symbol: 'circle',
                        type: 'max',
                        name: '最高点'
                    }]
                ]
            }
        }
    ]
};
const ajax = function (request) {
    const r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType != undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function () {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    if (request.method == 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

const fetchWeather = function () {
    const url = 'https://free-api.heweather.com/v5/forecast?city=shenyang&key=1340a5de90ca412089dbc2cc5c56d530'
    const request = {
        url: url,
        method: 'GET',
        callback: function (r) {
            const w = JSON.parse(r)
            const weather = w.HeWeather5[0].daily_forecast
            const day = []
            const max = []
            const min = []
            for (let i = 0; i < weather.length; i++) {
                const s = weather[i]
                const date = String(s.date)
                const tmpMax = Number(s.tmp.max)
                const tmpMin = Number(s.tmp.min)
                day.push(date)
                max.push(tmpMax)
                min.push(tmpMin)
            }
            option.xAxis.data = day
            option.series[0].data = max
            option.series[1].data = min
            myChart.setOption(option)
        }
    }
    ajax(request)
}