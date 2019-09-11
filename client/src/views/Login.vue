<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">
                    在線管理系統
                </span>
                <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
                    <el-form-item label="郵箱" prop="email">
                        <el-input type="email" v-model="loginUser.email" placeholder="請輸入email"></el-input>
                    </el-form-item>
                    <el-form-item label="密碼" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="請輸入密碼"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登入</el-button>
                    </el-form-item>
                    <div class="tiparea">
                        <p>還沒有帳號現在<router-link to="/register">註冊</router-link></p>
                    </div>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
export default {
    data(){
        return{
            loginUser:{
                email:'',
                password:'',
            },
            rules:{
                email:[
                    {
                        type:'email',
                        required:true,
                        message:'郵箱格式不對',
                        trigger:'blur'
                    }
                ],
                password:[
                    {
                        required:true,
                        message:'密碼不能為空',
                        trigger:'blur'
                    },
                    {
                        min:6,
                        max:30,
                        message:'長度要在6~30之間',
                        trigger:'blur'
                    }
                ],
            }
        }
    },
    methods:{
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/api/users/login', this.loginUser)
                .then(result => {
                    this.$message({
                        message:'登入成功',
                        type: 'success'
                    });
                    console.log('登入！ ',result)
                    const {token} = result.data;
                    localStorage.setItem('eleToken', token)

                    // 解析token
                    const decode = jwt_decode(token)
                    console.log(decode);

                    // token存到vuex
                    this.$store.dispatch('setAuthenticated', !this.isEmpty(decode));
                    this.$store.dispatch('setUser', decode);

                    this.$router.push('/index')
                })
                .catch(err =>{ 
                    this.$message({
                        message:'登入失敗',
                        type: 'warning'
                    });
                    console.log(err)
                });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      isEmpty(value){
          return (
              value === undefined ||
              value === null ||
              (typeof value === 'object' && Object.keys(value).length === 0) ||
              (typeof value === 'string' && value.trim().length === 0)
          );
      }
    }
}
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>