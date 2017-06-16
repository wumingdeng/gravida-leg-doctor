<template>
<section>
    <div class="toolbar">
        <el-form :inline="true" :model="filters">
            <el-form-item>
                <el-input v-model="filters.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="getUsers">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-row type="flex" align="middle" :gutter="20">
      <el-table v-loading="listLoading" :data="tableData" style="width: 100%" @row-click="onRowClick">
      <el-table-column prop="id" label="就诊号" style="width: 15%">
      </el-table-column>
      <el-table-column prop="date_server"  label="就诊时间">
      </el-table-column>
      <el-table-column prop="date_yunfu"  label="怀孕时间">
      </el-table-column>
      <el-table-column prop="name" label="就诊人姓名">
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
      <el-table-column prop="height" label="身高">
      </el-table-column>
      <el-table-column prop="weight" label="体重">
      </el-table-column>
      <el-table-column label="操作" style="width: 5%">
        <template scope="scope">
          <el-button
            size="small"
            @click="open2(scope.$index, scope.row)">查看报告</el-button>
        </template>
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
import api from "../../util/api.js";
import g from "../../globals/global.js";
import {setCookie,getCookie,delCookie} from "../../util/cookieUnit.js";
export default {
  data () {
    return {
        curPage:1,
        pageSize:10,
        total:10,
        tableData:[],
        listLoading: false,
        doctor_no:0,
        filters: {
					name: ''
				},
    }
  },
  methods: {
      onRowClick(row, event, column){
        var no = row.open_id
        this.$router.push({ name: '客人信息', params: { no: no }})
      },
      createdateformatter(row, column){
          var value = row.createdAt
          var data = value.split('T')[0]
          var time = value.split('T')[1]
          time = time.split('.')[0]
          time = time.substring(0,5)
          return data+" "+time
      },
      handle_setPageSize(pageSize){
        //  this.$data.pageSize = pageSize
        //  this.findByPage()
      },
      handle_setCurPage(currentPage){
          if(this.$data.curPage == currentPage) return
          this.$data.curPage = currentPage
          this.findByPage()
      },
      findByPage(){
          this.$data.listLoading = true
          var postData = {
              p:this.$data.curPage,
              s:0,
              did:this.doctor_no
          }
          console.log("findByPage")
          this.$http.post(g.debugUrl+"getVisits",postData).then((res)=>{
              if(res.body.error){

              }else{
                console.log(res.body.r.count)
                this.$data.total = res.body.r.count;
                this.$data.tableData = res.body.r.rows;  
              }
              this.$data.listLoading = false    
          },
          (res)=>{
              this.$data.listLoading = false   
          })
      },
      getUsers(){
          this.$data.listLoading = true
          var postData = {
              offset:0,
              limit:this.$data.pageSize,
              v:this.$data.filters.name,
              k:"patient_no"
          }
          this.$http.post(g.debugUrl+"getVisitsBylike",postData).then((res)=>{
              this.$data.total = res.body.d.count;
              this.$data.tableData = res.body.d.rows;  
              this.$data.listLoading = false    
          },
          (res)=>{
              this.$data.listLoading = false   
          })
      },
      open2(idx,row){
          var no = row.mac_id
          var openid = row.open_id
          console.log(no)
          this.$router.push({ name: '客人报告', params: { no: no ,open_id:openid}})
      }
    },
    
   mounted (){
      console.log("mounted")
      var user = getCookie('user');
        if (user) {
            user = JSON.parse(user);
            if(user){
                this.doctor_no = user.doctor_no
            }
        }
       this.findByPage()
   },
   created (){
       console.log("create")
   }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
