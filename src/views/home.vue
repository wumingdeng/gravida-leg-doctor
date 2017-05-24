
<template>
    <el-row class="container">
        <el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                <el-menu default-active='1' theme="dark" router>
                <el-menu-item index='1' :route="{path: '/home/'+gs+'/visit'}">就诊管理</el-menu-item>
                <el-menu-item index='2' :route="{path: '/home/'+gs+'/user'}">用户管理</el-menu-item>
                </el-menu>
            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
import {setCookie,getCookie,delCookie} from "../util/cookieUnit.js";
  import g from "../globals/global.js";
export default {
    data() {
        return {
            gs:"",
            sysName:'孕妇鞋',
            collapsed:false,
            sysUserName: '',
            sysUserAvatar: '',
            s1_cout:1,
            s2_cout:2,
            s3_cout:3,
            s4_cout:4
        }
    },
    methods: {
        //退出登录
        logout: function () {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
                //type: 'warning'
            }).then(() => {
                setCookie('user', null);
                _this.$http.get(g.debugUrl+"signOut").then((res)=>{
                    if(res.body.ok == 1){
                        _this.$router.push('/login/'+_this.$data.gs);
                    } else{
                        this.$alert('退出失败', '警告', {
                            confirmButtonText: '确定'
                        });
                    }   
                },
                (res)=>{
                })
            }).catch(() => {

            });
        },
        //折叠导航栏
        collapse:function(){
            this.collapsed=!this.collapsed;
        },
        showMenu(i,status){
            this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
        }
    },
    mounted() {
        console.log("home")
        this.$data.gs = this.$route.params.gs
        // var user = {
        //     name:"fizzo",
        //     avatar:"https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png",
        //     doctor_no:"1001"
        // }
        // sessionStorage.setItem('user', JSON.stringify(user));

        var user = getCookie('user');
        if (user) {
            user = JSON.parse(user);
            this.sysUserName = user.familyname || '';
            this.sysUserAvatar = user.avatar || '';
        }
    },
    beforeMount() {
        if(g.login){
            
        }else{
            // this.$router.push({name:'login'})
        }
    }
}
</script>

<style lang="css" rel="stylesheet/css">
  
  /* 主内容区 */
main{display: -ms-flexbox;display: flex;  min-height: 800px;  border: solid 1px #FCFCFC;  background-color: #FCFCFC;
}
main .main-left{text-align: center;-ms-flex: 0 0 200px;flex: 0 0 200px;padding: 5px 5px;
}
main .main-right{-ms-flex:1;flex:1; background-color: #fff; padding: 5px 5px;
}
.container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
}
.header {
    height: 60px;
    line-height: 60px;
    background:#20a0ff;
    color:#fff;
}

.header .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
}
.header .userinfo .userinfo-inner {
    cursor: pointer;
    color:#fff;
}
.header .userinfo .userinfo-inner img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    float: right;
}
.header .logo {
    height:60px;
    font-size: 22px;
    padding-left:20px;
    padding-right:20px;
    border-color: rgba(238,241,146,0.3);
    border-right-width: 1px;
    border-right-style: solid;
}
.header .logo img {
    width: 40px;
    float: left;
    margin: 10px 10px 10px 18px;
}
.header  .logo .txt {
    color:#fff;
}
.header .logo-width{
    width:230px;
}
.header .logo-collapse-width{
    width:60px
}
.header .tools{
    padding: 0px 23px;
    width:14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
}

.main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
}
.main aside {
    flex:0 0 230px;
    width: 230px;
}
.main aside .el-menu{
    height: 100%;
}
.main aside .collapsed{
    width:60px;
}
.main aside .collapsed .item{
    position: relative;
}
.main aside .collapsed .submenu{
    position:absolute;
    top:0px;
    left:60px;
    z-index:99999;
    height:auto;
    display:none;
}

.main .menu-collapsed{
    flex:0 0 60px;
    width: 60px;
}
.main .menu-expanded{
    flex:0 0 230px;
    width: 230px;
}
.main .content-container {
    flex:1;
    overflow-y: scroll;
    padding: 20px;
}
.main .content-container .breadcrumb-container .title {
    width: 200px;
    float: left;
    color: #475669;
}
.main .content-container .breadcrumb-container .breadcrumb-inner {
    float: right;
}
.main .content-container .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
}
</style>
