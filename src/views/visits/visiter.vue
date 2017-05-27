<template>
<el-row type="flex" align="middle" :gutter="20">
    <el-table v-loading="listLoading" :data="reportInfo" style="width: 100%">
      <el-table-column prop="createdAt" :formatter="createdateformatter" label="就诊时间" style="width: 15%">
      </el-table-column>
      <el-table-column prop="id" label="报告号" style="width: 15%">
      </el-table-column>
      <el-table-column prop="gravida_no" label="就诊人员编号" style="width: 15%">
      </el-table-column>
   
      </el-table-column>
      <el-table-column prop="leg_judge" label="足部判断" style="width: 50%">
      </el-table-column>
      <el-table-column prop="leg_health" label="足部保健知识" style="width: 50%">
      </el-table-column>
      <el-table-column prop="pro_style" :formatter="proFormatter" label="建议鞋型" style="width: 50%">
      </el-table-column>
    </el-table>
</el-row>
</template>

<script>
import g from "../../globals/global.js";
export default {
  data () {
    return {
        listLoading:false,
        reportInfo:[]
    }
  },
  methods: {
      createdateformatter(row, column){
          var value = row.createdAt
          var data = value.split('T')[0]
          var time = value.split('T')[1]
          time = time.split('.')[0]
          time = time.substring(0,5)
          return data+" "+time
      },
      proFormatter(row, column){
          var value = row.pro_style
          switch(value){
              case 0:
              return "基础功能型";
              case 1:
              return "加强缓震型";
              case 2:
              return "控制型";
              case 3:
              return "超级稳定型";
              case 4:
              return "保胎孕妇鞋";
              default:
              return ""
          }
      },
      getUsers(no){
          this.$data.listLoading = true
          this.$http.post(g.debugUrl+"getReportByNo",{no:no}).then((res)=>{
            //   console.log(res.body.d)
            this.$data.reportInfo = res.body.d
            this.$data.listLoading = false    
          },
          (res)=>{
              this.$data.listLoading = false   
          })
      }
    },
    
   mounted (){
      var patient_no = this.$route.params.no
      console.log(patient_no)
      this.getUsers(patient_no)
   },
   created (){
       console.log("create")
   }
}
</script>
