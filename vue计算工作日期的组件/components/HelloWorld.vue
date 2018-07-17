<template>
  <div class="hello">
    <div class="block date_box_left">
      <span class="demonstration">开始时间：</span>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期时间">
      </el-date-picker>
    </div>
    <div class="block date_box_right">
      <span class="demonstration">结束时间：</span>
      <el-date-picker v-model="value2" type="date" placeholder="选择日期时间">
      </el-date-picker>
    </div>
    <div class="date_confirm">
      <el-button @click="computeDaysDelta(value1, value2)">确认</el-button>
    </div>
    <p>结果：{{ result }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: '',
        value2: '',
        result: ''
      }
    },
    computed: {

    },
    methods: {
      fmtDate: function(date){   //时间格式化
        var date = date;
        var y = 1900+date.getYear();
        var m = "0"+(date.getMonth()+1);
        var d = "0"+date.getDate();
        return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
      },
      stringToDate: function(dateString){  //转时间戳
        var dateString = this.fmtDate(dateString); 
        dateString = dateString.split('-');
        return new Date(dateString[0], dateString[1] - 1, dateString[2]);
      },
      computeDaysDelta: function(date1, date2){   //核心计算函数
        var date1 = this.stringToDate(date1);
        var date2 = this.stringToDate(date2);
        var delta = (date2 - date1) / (1000 * 60 * 60 * 24) + 1;
        var weekEnds = 0;
        if (delta < 0) {
          for (let i = delta; i < 0; i++) {
            if (date1.getDay() == 0 || date1.getDay() == 6) {
              weekEnds++;
            }
            date1 = date1.valueOf();
            date1 -= 1000 * 60 * 60 * 24;
            date1 = new Date(date1);
          }
          this.result = delta + weekEnds;
          return this.result;
        } else {
          for (let i = 0; i < delta; i++) {
            var superArr = ["2018-07-01","2018-07-03"]     //设置法定节假日
            var superDate = this.fmtDate(date1);
            var status = superArr.indexOf(superDate);

            if (date1.getDay() == 0 || date1.getDay() == 6 || status!==-1) {
              weekEnds++;
            }
            date1 = date1.valueOf();
            date1 += 1000 * 60 * 60 * 24;
            date1 = new Date(date1);
          }
          this.result = delta - weekEnds;
          return this.result;
        }

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .date_box_left{
    display: inline-block;
    margin-left: 20px;
  }
  .date_box_right{
    display: inline-block;
    margin-left: 20px;
  }
  .date_confirm{
    display: inline-block;
    margin-left: 20px;
  }
</style>
