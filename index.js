var app = new Vue({
  el: '#app',
  data: {
    summary: {},
    areas: [
      '鹿城区',
      '龙湾区',
      '瓯海区',
      '洞头区',
      '乐清市',
      '瑞安市',
      '永嘉县',
      '文成县',
      '平阳县',
      '泰顺县',
      '苍南县',
      '龙港市',
      '瓯江口产业集聚区',
      '浙南产业集聚区'
    ],
    tableData: [],
    lineChartData: []
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetch('./data.json')
        .then(json => json.json())
        .then(res => {
          const trend = res.trend
          this.summary = res.summary
          let isFirst = false

          for (const key in trend) {
            if (trend.hasOwnProperty(key)) {
              if (!isFirst) {
                isFirst = true
                this.tableData = trend[key].sort(
                  (a, b) => b.confirmedCount - a.confirmedCount
                )
              }

              let confirmedCount = 0
              // get line chart data
              for (const item of trend[key]) {
                confirmedCount += item.confirmedIncr
              }

              this.lineChartData.push({
                date: key,
                value: confirmedCount
              })
            }
          }

          this.renderLineChart()
        })
    },
    renderLineChart() {
      const chart = new G2.Chart({
        container: 'lineChart',
        forceFit: true,
        height: 500,
      })
      chart.source(this.lineChartData)
      chart.scale('value', {
        min: 0
      })
      chart.tooltip({
        crosshairs: {
          type: 'line'
        },
      })
      chart.line().position('date*value')
      chart
        .point()
        .position('date*value')
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
      chart.render()
    }
  }
})
