<template>
<section>
<el-row type="flex" align="middle" :gutter="20">
    <el-table v-loading="listLoading" :data="reportInfo" style="width: 100%">
      <el-table-column prop="date_server" :formatter="createdateformatter" label="服务时间" >
      </el-table-column>
      <el-table-column prop="date_yunfu" :formatter="createdateformatter" label="怀孕时间" >
      </el-table-column>
      <el-table-column prop="id" label="报告号" >
      </el-table-column>
      <el-table-column prop="name" label="用户姓名" >
      </el-table-column>
      <el-table-column prop="hospital_name" label="医院名称" >
      </el-table-column>
      <el-table-column prop="doctor_name" label="医生姓名" >
      </el-table-column>
      <el-table-column prop="leg_judge" label="足部判断" >
      </el-table-column>
      <el-table-column prop="leg_health" label="足部保健知识" >
      </el-table-column>
      <el-table-column prop="pro_style" :formatter="proFormatter" label="建议鞋型" >
      </el-table-column>
    </el-table>
</el-row>
<el-row type="flex" justify="end" style="padding:20px 0; ">
        <el-pagination
          :current-page="curPage"
          :page-sizes="[10]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="total"
          @size-change="handle_setPageSize"
          @current-change="handle_setCurPage">
        </el-pagination>
      </el-row>
      </section>
</template>

<script>
import g from "../../globals/global.js";
export default {
  data () {
    return {
        listLoading:false,
        curpage:1,
        pageSize:10,
        total:0,
        reportInfo:[]
    }
  },
  methods: {
      handle_setPageSize(pageSize){
        //  this.$data.pageSize = pageSize
        //  this.findByPage()
      },
      handle_setCurPage(currentPage){
          if(this.$data.curPage == currentPage) return
          this.$data.curPage = currentPage
          this.findByPage()
      },
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
          this.$http.post(g.debugUrl+"getUserReport",{no:no}).then((res)=>{
            if(res.body.error){

            }else{
                console.log(res.body.r.count)
                this.$data.total = res.body.r.count;
                this.$data.reportInfo = res.body.r.rows;  
            }
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
