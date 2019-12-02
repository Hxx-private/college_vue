<template>
  <div>
    <el-container>
      <el-header style="height: 100px">
        <el-row>
          <el-col :span="2" style="line-height:36px">
            <el-button size="mini" type="success" @click="loadUser" icon="el-icon-refresh">刷新</el-button>
          </el-col>
          <el-col :span="5">
            <el-input size="small" v-model="searchUserName"  
                      style="width:90%;" placeholder="请输入用户名">
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input  size="small" v-model="searchName"  
                      style="width:90%;" placeholder="请输入真实姓名">
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input  size="small" v-model="searchNumber"  
                      style="width:90%;" placeholder="请输入学号/工号">
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input  size="small" v-model="searchSex"
                      style="width:90%;" placeholder="请输人性别">
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5" :offset="2">
            <el-input  size="small" v-model="searchRoomId"  
                      style="width:90%;" placeholder="请输入宿舍号">
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input size="small" v-model="searchDepart"  
                      style="width:90%;" placeholder="请入所在系">
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input size="small" v-model="searchSpecial"  
                      style="width:90%;" placeholder="请输入所在专业">
            </el-input>
          </el-col>
          <el-col :span="2" style="line-height:36px;text-align: right">
            <el-button size="mini" @click="searchAll">查询</el-button>
          </el-col>
          <el-col :span="2" style="line-height:36px;text-align: right">
            <el-button size="mini" @click="emptyInput">重置</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <el-table :data="users" stripe v-loading="tableLoading" size="mini" style="width: 100%">
            <el-table-column type="selection" width="30"></el-table-column>
            <!--            <el-table-column type="listId" label="序号"></el-table-column>-->
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="name" label="真实姓名"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="number" label="学号/工号"></el-table-column>
            <el-table-column prop="roomId" label="宿舍号"></el-table-column>
            <el-table-column prop="depart" label="系别"></el-table-column>
            <el-table-column prop="special" label="专业"></el-table-column>
            <el-table-column prop="tel" label="联系电话"></el-table-column>
            <el-table-column prop="registerTime" label="注册时间"></el-table-column>
            <el-table-column label="操作" align="center">
               
              <template slot-scope="scope">
                                 
                <el-button type="text" @click="details(scope.row)">编辑</el-button>
                   
                <el-button type="text" @click="deleteId(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="lastLine">               
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="pageNum" :page-sizes="[5, 10, 20]"
                           :page-size="pageSize"
                           layout="sizes, prev, pager, next" :total="total">      
            </el-pagination>
          </div>
        </div>
      </el-main>

    </el-container>
    <el-dialog title="详情" :visible.sync="click8">
             
      <el-form :model="form0"  label-width="100px"  >
                  
        <el-form-item label="用户名：">
              
          <el-input v-model="form0.username"  style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：">
            
          <el-input v-model="form0.name"  style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
            
          <el-input v-model="form0.sex"  style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="年龄：">
            
          <el-input v-model="form0.age"  style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="学号/工号：">
            
          <el-input v-model="form0.number"  style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="宿舍号：">
            
          <el-input v-model="form0.roomId"  style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="系别：">
            
          <el-input v-model="form0.depart"  style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="专业：">
            
          <el-input v-model="form0.special"  style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
            
          <el-input v-model="form0.tel"  style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="注册时间：">{{form0.registerTime}}
          <!--              <el-input v-model="form0.registerTime" style="width: 240px;"></el-input>-->
        </el-form-item>

              
      </el-form>
                
      <div slot="footer">
                      
        <el-button @click="click8= false">取 消</el-button>
                      
        <el-button type="primary"  @click="sureAddDocSize">确 定</el-button>
              
      </div>
    </el-dialog>
  </div>

</template>

<script>
    import {Message} from 'element-ui'

    export default {
        data() {
            return {
                searchSpecial:'',
                searchDepart:'',
                searchRoomId:'',
                searchSex:'',
                searchNumber:'',
                searchUserName: '',
                searchName: '',//查询
                tableLoading: false,
                index: 0,
                users: [],
                multipleSelection: [],
                user: {
                    id: '',
                    userName: '',
                    name: '',
                    sex: '',
                    age: '',
                    number: '',
                    roomId: '',
                    depart: '',
                    special: '',
                    tel: '',
                    registTime: '',
                },
                click8: false,
                form0: {
                    userName: '',
                    name: '',
                    sex: '',
                    age: '',
                    number: '',
                    roomId: '',
                    depart: '',
                    special: '',
                    tel: '',
                    registTime: '',
                },
                pageNum: 1,
                pageSize: 10,
                total: 0,
                list: [],
            };
        },

        // computed:{
        //     users(){
        //         var  searchName = this.searchName
        //         // this.users = this.users.filter( (searchName,searchUserName ) => {
        //         //     let matchName = true; // 姓名 筛选
        //         //     let matchUserName = true; // 用户名 筛选
        //         //
        //         //     if (searchName) {
        //         //         matchName = this.users ;
        //         //         if(matchName.includes(searchName)){
        //         //             return matchName
        //         //         }
        //         //     }
        //         //     if (searchUserName) {
        //         //         matchUserName = this.users ;
        //         //         if(matchUserName.includes(searchUserName)){
        //         //             return matchUserName
        //         //         }
        //         //     }
        //         //     console.log("————————————————————————————————————————————")
        //         //
        //         //
        //         //
        //         //     });
        //
        //         if (searchName) {
        //             return this.users.filter(data => {
        //                 return Object.keys(data).some(key => {
        //                     return String(data[key]).toLowerCase().indexOf(searchName) > -1
        //                 })
        //             })
        //             return this.users
        //         }
        //
        //     },
        // },
        methods: {
            loadUser: function () {
                this.tableLoading = true;
                // var _this = this;
                this.getRequest("/user/list?pageSize=" + this.pageSize + "&pageNum=" + this.pageNum).then(resp => {
                    this.tableLoading = false;
                    if (resp && resp.status == 200) {
                        this.total = resp.data.obj.total
                        this.users = resp.data.obj.data;
                        for (var i = 0; i < this.users.length; i++) {
                            this.users[i].listId = i + 1
                            switch (this.users[i].sex) {
                                case 0:
                                    this.users[i].sex = '男';
                                    break;
                                case 1:
                                    this.users[i].sex = '女';
                                    break;
                            }
                        }
                    }
                })
            },
            deleteId(row) {  //删除
                // console.log(row.id)
                // return false
                var uName = row.username
                this.tableLoading = true;
                var _this = this;
                this.getRequest("/user/delByUserName?userName=" + uName).then(resp => {
                    _this.tableLoading = false;
                    if (resp && resp.status == 200) {
                        this.loadUser();
                        Message.success({message: data.data.msg});
                    }
                })
            },

            details(row) {   //详情
                this.form0 = row
                this.click8 = true
            },
            sureAddDocSize() {   //确定修改
                this.click8 = false
            },
            handleSizeChange(val) {    //分页
                this.pageSize = val
                this.loadUser()
            },
            handleCurrentChange(val) {   //分页
                this.pageNum = val
                this.loadUser()
            },
            searchAll() {

            },
            emptyInput(){
                  this.searchName='';
                  this. searchSpecial='';
                  this.searchDepart='';
                  this.searchRoomId='';
                  this.searchNumber='';
                  this.searchUserName='';
                  this.searchSex='';
                  this.loadUser();
            }

        },
        mounted: function () {
            this.loadUser();
        },

    }


</script>
<style>
  .lastLine {
        display:  flex;
        flex-direction:  row;
        justify-content:  flex-end;
        margin:  10px 0 10px 0;
  }

  .el-input__inner {
    margin: 0 15px;
  }

  .el-row {
    margin: 10px 0;
  }
</style>


