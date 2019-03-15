<template>
  <div class="home">
    <el-row>
      <el-col :span="12">
        <div class="pie">
          <ve-pie :data="pieData"></ve-pie>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="histogram">
          <ve-histogram :data="histogramData"></ve-histogram>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="line">
          <ve-line :data="chartData"></ve-line>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VePie from 'v-charts/lib/pie.common';
import VeHistogram from 'v-charts/lib/histogram.common';
import VeLine from 'v-charts/lib/line.common';
export default {
  name: 'home',
  components: { VePie, VeHistogram, VeLine },
  data() {
    return {
      pieData: {
        columns: ['date', 'PV'],
        rows: [
          { 'date': '01-01', 'PV': 1231 },
          { 'date': '01-02', 'PV': 1223 },
          { 'date': '01-03', 'PV': 2123 },
          { 'date': '01-04', 'PV': 4123 },
          { 'date': '01-05', 'PV': 3123 },
          { 'date': '01-06', 'PV': 7123 }
        ]
      },
      histogramData: {
        columns: ['date', 'PV'],
        rows: [
          { 'date': '01-01', 'PV': 1231 },
          { 'date': '01-02', 'PV': 1223 },
          { 'date': '01-03', 'PV': 2123 },
          { 'date': '01-04', 'PV': 4123 },
          { 'date': '01-05', 'PV': 3123 },
          { 'date': '01-06', 'PV': 7123 }
        ]
      },
      chartData: {
        columns: ['date', 'PV'],
        rows: [
          { 'date': '01-01', 'PV': 1231 },
          { 'date': '01-02', 'PV': 1223 },
          { 'date': '01-03', 'PV': 2123 },
          { 'date': '01-04', 'PV': 4123 },
          { 'date': '01-05', 'PV': 3123 },
          { 'date': '01-06', 'PV': 7123 }
        ]
      }
    }
  }
}
</script>

<style lang="less">
.home {
  width: 100%;
  overflow-x: hidden;
}
.pie {
  width: 50%;
  padding: 30px;
}
.histogram {
  width: 50%;
  padding: 30px;
}
</style>
