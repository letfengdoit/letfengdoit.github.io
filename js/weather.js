var myChart = echarts.init(document.querySelector('#weather'))

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '沈阳市',
                subtext: '三天内气温变化'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['最高气温','最低气温']
            },
            // toolbox: {
            //     show: true,
            //     feature: {
            //         dataZoom: {
            //             yAxisIndex: 'none'
            //         },
            //         dataView: {readOnly: false},
            //         magicType: {type: ['line', 'bar']},
            //         restore: {},
            //         saveAsImage: {}
            //     }
            // },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} °C'
                }
            },
            series: [
                {
                    name:'最高气温',
                    type:'line',
                    data:[11, 11, 15],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name:'最低气温',
                    type:'line',
                    data:[1, -2, 2],
                    markPoint: {
                        data: [
                            {name: '周最低', value: -2, xAxis: 1}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'},
                            [{
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            }, {
                                symbol: 'circle',
                                label: {
                                    normal: {
                                        position: 'start',
                                        formatter: '最低'
                                    }
                                },
                                type: 'max',
                                name: '最高点'
                            }]
                        ]
                    }
                }
            ]
        };
        var ajax = function(request) {

            var r = new XMLHttpRequest()
            r.open(request.method, request.url, true)
            if (request.contentType != undefined) {
                r.setRequestHeader('Content-Type', request.contentType)
            }
            r.onreadystatechange = function() {
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

        var fetchWeather = function() {
            var url = 'https://free-api.heweather.com/v5/forecast?city=shenyang&key=1340a5de90ca412089dbc2cc5c56d530'
            var request = {
                url: url,
                method: 'GET',
                callback: function(r) {
                    var w = JSON.parse(r)
                    var weather = w.HeWeather5[0].daily_forecast
                    var day = []
                    var max = []
                    var min = []
                    for (var i = 0; i < weather.length; i++) {
                        var s = weather[i]
                        var date = String(s.date)
                        var tmpMax = Number(s.tmp.max)
                        var tmpMin = Number(s.tmp.min)
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
