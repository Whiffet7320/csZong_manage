<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">积分设置</div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form :model="ruleForm" ref="ruleForm" label-width="210px" class="demo-ruleForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="登录获得积分数：">
                <el-input size="small" v-model="ruleForm.integral_login"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="注册获得积分数：" prop="integral_register">
                <el-input size="small" v-model="ruleForm.integral_register"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发布动态积分数：" prop="integral_writecircle">
                <el-input size="small" v-model="ruleForm.integral_writecircle"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="推广获得积分数：" prop="integral_spread">
                <el-input size="small" v-model="ruleForm.integral_spread"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="方案采纳获得积分数：" prop="integral_gather">
                <el-input size="small" v-model="ruleForm.integral_gather"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="置顶价格：" prop="istop_price">
                <el-input size="small" v-model="ruleForm.istop_price"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="锁定推荐人最低消费金额(元)：" prop="recommendconsume_price">
                <el-input size="small" v-model="ruleForm.recommendconsume_price"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="支付超级会员的金额：" prop="superuser_price">
                <el-input size="small" v-model="ruleForm.superuser_price"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="积分消费比例(%)：" prop="integral_consumption">
                <el-input size="small" v-model="ruleForm.integral_consumption"></el-input>
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
        integral_login: "",
        integral_register: "",
        integral_writecircle: "",
        integral_spread: "",
        integral_gather: "",
        istop_price: "",
        recommendconsume_price: "",
        superuser_price: "",
        integral_consumption: ""
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
      const res = await this.$api.system_view();
      console.log(res);
      this.ruleForm = {
        ...res.data
      };
    },
    async submitForm() {
      const res = await this.$api.system_set({
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
  }
}
</style>