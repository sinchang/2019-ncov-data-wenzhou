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
    tableData: []
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

          for (const key in trend) {
            if (trend.hasOwnProperty(key)) {              
              this.tableData = trend[key].sort(
                (a, b) => b.confirmedCount - a.confirmedCount
              )
              break
            }
          }
        })
    }
  }
})
