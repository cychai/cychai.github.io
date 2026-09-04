(function () {
  var element = document.getElementById('chart-arr');
  if (!element || typeof echarts === 'undefined') return;

  var chart = echarts.init(element, null, { renderer: 'svg' });

  function render() {
    var style = getComputedStyle(document.documentElement);
    var accent = style.getPropertyValue('--accent').trim();
    var accent2 = style.getPropertyValue('--accent2').trim();
    var ink = style.getPropertyValue('--ink').trim();
    var muted = style.getPropertyValue('--muted').trim();
    var rule = style.getPropertyValue('--rule').trim();
    var bg2 = style.getPropertyValue('--bg2').trim();

    chart.setOption({
      animation: false,
      color: [accent, accent2],
      tooltip: {
        trigger: 'axis',
        appendToBody: true,
        formatter: function (items) {
          var item = items[0];
          return '<strong>' + item.axisValue + '</strong><br>ARR：$' + item.value + 'M<br><span style="color:' + muted + '">公司披露口径</span>';
        }
      },
      grid: { left: 54, right: 24, top: 38, bottom: 64 },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2025/04', '2025/05', '2025/09', '2026/01', '2026/03', '2026/04'],
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 12 }
      },
      yAxis: {
        type: 'value',
        name: 'USD million',
        nameTextStyle: { color: muted },
        min: 0,
        max: 280,
        splitNumber: 4,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: muted },
        splitLine: { lineStyle: { color: rule } }
      },
      series: [{
        name: 'ARR',
        type: 'line',
        smooth: 0.22,
        symbol: 'circle',
        symbolSize: 9,
        data: [10, 36, 50, 100, 200, 250],
        lineStyle: { width: 4, color: accent },
        itemStyle: { color: accent, borderColor: bg2, borderWidth: 3 },
        areaStyle: { color: accent + '18' },
        label: {
          show: true,
          position: 'top',
          color: ink,
          fontSize: 12,
          formatter: '${c}M'
        },
        markPoint: {
          symbol: 'pin',
          symbolSize: 42,
          itemStyle: { color: accent2 },
          label: { color: bg2, fontSize: 10 },
          data: [{ coord: ['2026/04', 250], value: '250' }]
        }
      }],
      backgroundColor: bg2
    }, true);
  }

  render();
  window.addEventListener('article-theme-change', render);
  window.addEventListener('resize', function () { chart.resize(); });
})();
