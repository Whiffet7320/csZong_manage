<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">关于我们设置</div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="公司邮箱：">
                <el-input size="small" v-model="ruleForm.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="公司微信：" prop="weixin">
                <el-input size="small" v-model="ruleForm.weixin"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="公司电话：" prop="phone">
                <el-input size="small" v-model="ruleForm.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="公司地址：" prop="address">
                <el-input size="small" v-model="ruleForm.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="版权信息：" prop="copyright">
                <el-input type="textarea" size="small" v-model="ruleForm.copyright"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button
              icon="el-icon-s-promotion"
              size="small"
              type="primary"
              @click="submitForm('ruleForm')"
            >提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        email:'',
        weixin: "",
        phone: "",
        address: "",
        copyright: "",
      },
      rules: {
        get_user_integral: [
          {
            required: true,
            message: "请输入邀请新用户可获得积分",
            trigger: "blur"
          }
        ],
        withdrawal_limit: [
          { required: true, message: "请输入提现最低金额", trigger: "blur" }
        ],
        pintuan_use_integral: [
          {
            required: true,
            message: "请输入拼团板块达到多少次可使用积分",
            trigger: "blur"
          }
        ],
        kefu_num: [
          { required: true, message: "请输入客服号码", trigger: "blur" }
        ],
        kefu_weixin: [
          { required: true, message: "请输入客服微信", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.about_info();
      console.log(res);
      this.ruleForm = {
        ...res.data
      };
    },
    async submitForm() {
      const res = await this.$api.edit_abouts({
        ...this.ruleForm
      });
      if (res.data.result == 1) {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.getData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.nav1 {
  margin: 0 -18px;
  background-color: #fff;
  padding: 20px 32px 0 40px;
  .tit1 {
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 20px;
  }
}
.nav2 {
  margin: 18px 0;
  background: #fff;
  border-radius: 6px;
  padding: 24px;
  .myForm {
    /deep/ .el-form-item__label {
      font-size: 12px;
    }
    /deep/ .el-form-item {
      margin-right: 30px;
      margin-bottom: 0;
    }
    /deep/ .el-textarea{
      font-size: 12px;
    }
  }
}
</style>