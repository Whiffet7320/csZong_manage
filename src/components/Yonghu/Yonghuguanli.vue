<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">用户管理</div>
      <div class="tit2">
        <!-- <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="微信公众号" name="2"></el-tab-pane>
          <el-tab-pane label="微信小程序" name="3"></el-tab-pane>
        </el-tabs>-->
      </div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <!-- <el-form-item label="用户搜索：">
            <div class="search">
              <el-input
                size="small"
                placeholder="请输入内容"
                v-model="formInline.search"
                class="input-with-select"
              >
                <el-select
                  class="left-select"
                  v-model="formInline.select"
                  slot="prepend"
                  placeholder="请选择"
                >
                  <el-option label="全部" value="1"></el-option>
                  <el-option label="UID" value="2"></el-option>
                  <el-option label="手机号" value="3"></el-option>
                  <el-option label="用户名称" value="4"></el-option>
                </el-select>
              </el-input>
            </div>
          </el-form-item>-->
          <el-form-item label="订单状态：">
            <el-radio-group v-model="formInline.rad1" size="small" @change="changRad1">
              <el-radio-button label="0">全部</el-radio-button>
              <el-radio-button label="1">普通</el-radio-button>
              <el-radio-button label="2">超级会员</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button size="small" icon="el-icon-search" type="primary" @click="onSubmit">搜索</el-button>
            <el-button size="small" @click="onReact">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tit1">
        <!-- <el-button
          @click="toAddShop"
          size="small"
          type="primary"
          icon="el-icon-plus"
          >添加商品</el-button
        >-->
      </div>
      <div class="myTable">
        <vxe-table height="700" :loading="loading" :data="tableData">
          <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <!-- <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">
                        店铺图：
                        <el-image
                          v-if="row.user_info"
                          :src="row.user_info.shop_img"
                          :preview-src-list="[row.user_info.shop_img]"
                          fit="fill"
                          style="width: 80px; height: 80px"
                        >
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div> -->
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">手机号：{{row.mobile}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">身份证：{{row.idcard}}</div>
                    </el-col>
                     <el-col :span="6">
                      <div class="item">邮箱：{{row.email}}</div>
                    </el-col>
                     <el-col :span="6">
                      <div class="item">余额：{{row.money}}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">积分：{{row.integral}}</div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column width="50" field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="avatar" title="头像">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.facepic"
                :preview-src-list="[scope.row.facepic]"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="nickname" title="用户名"></vxe-table-column>
          <vxe-table-column field="realname" title="姓名"></vxe-table-column>
          <!-- <vxe-table-column field="mobile" title="手机号"></vxe-table-column>
          <vxe-table-column field="idcard" title="身份证"></vxe-table-column>
          <vxe-table-column field="email" title="邮箱"></vxe-table-column>
          <vxe-table-column field="money" title="余额"></vxe-table-column>
          <vxe-table-column field="commission_money" title="佣金余额"></vxe-table-column>
          <vxe-table-column field="integral" title="积分"></vxe-table-column> -->
          <vxe-table-column field="myType" title="类型"></vxe-table-column>
          <vxe-table-column title="操作状态" width="140">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" type="text" @click="tabEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="text" @click="seeJifen(scope.row)">查看积分</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.yonghuguanliPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 查看积分 -->
    <el-dialog title="查看积分" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
      <!-- <div class="myForm">
        <el-form ref="mingxiFrom" :model="mingxiFrom" label-width="80px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="状态：">
                <el-radio-group @change="changeMingxiRadio" v-model="mingxiFrom.rad1" size="small">
                  <el-radio-button label="0">未审核</el-radio-button>
                  <el-radio-button label="1">已审核</el-radio-button>
                  <el-radio-button label="2">审核拒绝</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>-->
      <div class="myTable">
        <vxe-table :data="mingxiTableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="myTypes" title="类型"></vxe-table-column>
          <vxe-table-column field="myAdd_sub" title="支出/收入"></vxe-table-column>
          <vxe-table-column field="integral" title="变动积分"></vxe-table-column>
          <vxe-table-column field="createtime" title="时间"></vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.zijinmingxiHandleSizeChange"
          @current-change="this.zijinmingxiHandleCurrentChange"
          :current-page="this.zijinmingxiliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.mingxiTotal"
        ></el-pagination>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      title="编辑"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="类型">
                <el-radio-group v-model="addForm.add_sub">
                  <el-radio :label="0">减少</el-radio>
                  <el-radio :label="1">增加</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="积分数">
                <el-input size="small" v-model="addForm.num"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddOnSubmit">提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <input
      type="file"
      name="companyLogo"
      id="file0"
      class="displayN"
      multiple="multiple"
      @change="companyLogo($event)"
      ref="fileInputList"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      "yonghuguanliPage",
      "yonghuguanliPageSize",
      "zijinmingxiliebiaoPage",
      "zijinmingxiliebiaoPageSize"
    ])
  },
  watch: {
    yonghuguanliPage: function(page) {
      this.$store.commit("yonghuguanliPage", page);
      this.getData();
    },
    yonghuguanliPageSize: function(pageSize) {
      this.$store.commit("yonghuguanliPageSize", pageSize);
      this.getData();
    },
    zijinmingxiliebiaoPage: function(page) {
      this.$store.commit("zijinmingxiliebiaoPage", page);
      this.getData();
    },
    zijinmingxiliebiaoPageSize: function(pageSize) {
      this.$store.commit("zijinmingxiliebiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      loading: false,
      imgStatus: "",
      addDialogVisible: false,
      addForm: {
        id: "",
        add_sub: 1,
        num: ""
      },
      activeName: "1",
      formInline: {
        rad1: "0",
        search: "",
        select: ""
      },
      options: [],
      tableData: [],
      total: 51,
      dialogVisible: false,
      mingxiFrom: {
        rad1: "0"
      },
      mingxiTableData: [],
      mingxiTotal: 0,
      mingxiUser_id: "",
      editDialogVisible: false,
      editForm: {
        level: "",
        pwd: "",
        uniqid: "",
        spread_uid: ""
      },
      editId: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      const res = await this.$api.user_list({
        pagesize: this.yonghuguanliPageSize,
        page: this.yonghuguanliPage,
        is_retail: this.formInline.rad1
      });
      console.log(res.data);
      this.total = res.data.total;
      this.tableData = res.data.list;
      this.tableData.forEach(ele => {
        ele.myType = ele.is_retail == 1 ? "超级会员" : "普通会员";
      });
      console.log(this.tableData);
      this.loading = false;
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    changRad1(e) {
      console.log(e);
      this.getData();
    },
    // 删除图片
    delImg(val, i = 0) {
      console.log(i);
      if (val == "tx") {
        this.$set(this.addForm.user_info, "avatar", "");
      } else if (val == "zt") {
        this.$set(this.addForm.user_info, "business_license", "");
      } else if (val == "llt") {
        this.$set(this.addForm.user_info, "shop_img", "");
      }
      ``;
    },
    async AddOnSubmit() {
      console.log(this.addForm);
      const res = await this.$api.operation_userintegral({
        user_id: this.id,
        add_sub: this.addForm.add_sub,
        num: this.addForm.num
      });
      console.log(res);
      if (res.data.result == 1) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
        this.addDialogVisible = false;
      } else {
        this.$message.error(res.msg);
        this.getData();
      }
    },
    // 上传图片
    companyList(val) {
      this.imgStatus = val;
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      var file = event.target.files[0];
      this.imgFile = file;
      this.uploading(true);
      this.$refs.fileInputList.value = "";
    },
    //将文件转为blob类型
    readFileAsBuffer(file) {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.readAsDataURL(file);
        reader.onload = function() {
          const base64File = reader.result.replace(
            /^data:\w+\/\w+;base64,/,
            ""
          );
          resolve(new window.OSS.Buffer(base64File, "base64"));
        };
      });
    },
    async uploading(flag) {
      // console.log(document.getElementById("file0").value);
      if (flag) {
        var file_re = await this.readFileAsBuffer(this.imgFile);
        const res = await this.$api.uploadToken();
        let myData = res.data;
        console.log(myData);
        let client = new window.OSS.Wrapper({
          region: myData.region, //oss地址
          accessKeyId: myData.accessKeyId, //ak
          accessKeySecret: myData.accessKeySecret, //secret
          stsToken: myData.stsToken,
          bucket: myData.bucket //oss名字
        });
        var imgtype = this.imgFile.type.substr(6, 4);
        var store = `${new Date().getTime()}.${imgtype}`;
        client.put(store, file_re).then(() => {
          //这个结果就是url
          console.log(store);
          // var oss_imgurl = client.signatureUrl(store);
          var oss_imgurl = `https://${myData.bucket}.${myData.url}/${store}`;
          if (this.imgStatus == "tx") {
            this.$set(this.addForm.user_info, "avatar", oss_imgurl);
          } else if (this.imgStatus == "yyzz") {
            this.addForm.user_info.business_license = oss_imgurl;
          } else if (this.imgStatus == "dpt") {
            this.addForm.user_info.shop_img = oss_imgurl;
          }
          console.log(oss_imgurl);
        });
      }
    },
    tabEdit(row) {
      this.id = row.id;
      this.addDialogVisible = true;
    },
    seeJifen(row) {
      this.mingxiUser_id = row.id;
      this.getMingxiData();
      this.dialogVisible = true;
    },
    async getMingxiData() {
      const res = await this.$api.integral_list({
        id: this.mingxiUser_id,
        page: this.zijinmingxiliebiaoPage,
        limit: this.zijinmingxiliebiaoPageSize,
        status: this.mingxiFrom.rad1
      });
      console.log(res.data);
      this.mingxiTableData = res.data.list;
      this.mingxiTableData.forEach(ele => {
        ele.myTypes =
          ele.types == "1"
            ? "注册"
            : ele.types == "2"
            ? "登录"
            : ele.types == "3"
            ? "消费"
            : ele.types == "4"
            ? "发布动态"
            : ele.types == "5"
            ? "战术被后台采集"
            : ele.types == "6"
            ? "推荐获得积分（征兵）"
            : "手动发放";
        ele.myAdd_sub = ele.add_sub == "1" ? "收入" : "支出";
      });
      this.mingxiTotal = res.data.total;
    },
    async submitForm() {
      const res = await this.$api.updat_user_info({
        user_id: this.editId,
        ...this.editForm
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
        this.editDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    changeMingxiRadio() {
      this.getMingxiData();
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    toEdit(row) {
      this.editForm = {
        level: "",
        pwd: "",
        uniqid: "",
        spread_uid: ""
      };
      this.editId = row.user_id;
      this.editDialogVisible = true;
    },
    async seeMingxi(row) {
      console.log(row);
      this.mingxiUser_id = row.id;
      this.getMingxiData();
      this.dialogVisible = true;
    },
    toPingtuanjilu(row) {
      this.$router.push({
        name: "Pingtuanjilu",
        params: {
          userId: row.user_id
        }
      });
    },
    onSubmit() {
      console.log(this.formInline);
      this.getData();
    },
    onReact() {
      this.formInline.search = "";
      this.formInline.select = "";
      this.getData();
    },
    handleClose() {
      this.dialogVisible = false;
    },
    editHandleClose() {
      this.editDialogVisible = false;
    },
    formatDate(date1) {
      var date = new Date(date1);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + MM + DD + " " + hh + mm + ss;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("yonghuguanliPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("yonghuguanliPage", val);
    },
    zijinmingxiHandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("zijinmingxiliebiaoPageSize", val);
    },
    zijinmingxiHandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("zijinmingxiliebiaoPage", val);
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
  .tit2 {
    margin-top: 10px;
    /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 20px;
    }
    /deep/ .el-tabs__header {
      margin: 0 0 1px;
    }
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
      vertical-align: text-top;
    }
    .search {
      // margin-top: 5px;
      /deep/ .el-select {
        width: 100px;
      }
    }
  }
  .tit1 {
    margin-top: 10px;
  }
  .myTable {
    margin-top: 10px;
    .xiala {
      padding: 10px 20px;
      .item {
        font-size: 12px;
        display: flex;
      }
    }
    .flex {
      display: flex;
      align-items: center;
    }
    .fenye {
      margin-top: 10px;
    }
    /deep/ .vxe-table--render-default .vxe-body--column {
      line-height: 14px;
      vertical-align: middle;
    }
    /deep/ .vxe-cell--label {
      font-size: 12px;
    }
    /deep/ .vxe-cell--title {
      font-size: 12px;
    }
    /deep/ .image-slot {
      width: 38px;
      height: 38px;
      border: 1px solid #ddd;
      line-height: 38px;
      text-align: center;
      border-radius: 4px;
    }
  }
}
.myForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 0;
    vertical-align: middle;
  }
}
.myTable {
  margin-top: 10px;
  .xiala {
    padding: 10px 20px;
    .item {
      font-size: 12px;
      display: flex;
      // align-items: center;
    }
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .fenye {
    margin-top: 10px;
  }
  /deep/ .vxe-table--render-default .vxe-body--column {
    line-height: 14px;
    vertical-align: middle;
  }
  /deep/ .vxe-cell--label {
    font-size: 12px;
  }
  /deep/ .vxe-cell--title {
    font-size: 12px;
  }
  /deep/ .image-slot {
    width: 38px;
    height: 38px;
    border: 1px solid #ddd;
    line-height: 38px;
    text-align: center;
    border-radius: 4px;
  }
}
.editForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 20px;
  }
  .search {
    margin-top: 3px;
    /deep/ .el-select {
      width: 100px;
    }
  }
}
.myAddForm {
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
    width: 130px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 130px !important;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
  }
  /deep/ .el-button {
    width: 100%;
  }
  .myImg {
    position: relative;
    width: 60px;
    height: 60px;
    display: inline-block;
    margin-right: 12px;
    .closeBtn {
      position: absolute;
      top: -6px;
      right: -4px;
      width: 20px;
      height: 20px;
      .el-button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    /deep/ .image-slot {
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #fafafa;
      width: 58px;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .el-icon-picture-outline {
        font-size: 20px;
      }
    }
  }
}
.displayN {
  display: none;
}
</style>