<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">门店管理</div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="商品分类：">
            <el-select
              size="small"
              v-model="searchForm.pid"
              placeholder="商品分类"
            >
              <el-option label="顶级分类" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="状态：">
            <el-select v-model="searchForm.status" placeholder="状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="分类名称：">
            <el-input
              v-model="searchForm.keyword"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="searchOnSubmit"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>-->
      <!-- <div class="tit1">
        <el-button @click="AddFenlei" size="small" type="primary" icon="el-icon-plus">添加门店</el-button>
      </div>-->
      <div class="myTable">
        <vxe-table :loading="loading" align="center" :data="tableData">
          <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="item">申请店铺名称：{{row.apply_list.store_name}}</div>
                    </el-col>
                    <el-col :span="8">
                      <div class="item">申请人姓名：{{ row.apply_list.user_realname }}</div>
                    </el-col>
                    <el-col :span="8">
                      <div class="item">申请人电话：{{ row.apply_list.user_tel }}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="item">申请用户名：{{row.apply_list.recommend_usernickname}}</div>
                    </el-col>
                    <el-col :span="8">
                      <div class="item">
                        申请人头像：
                        <el-image
                          :src="row.apply_list.recommend_userfacepic"
                          :preview-src-list="[row.apply_list.recommend_userfacepic]"
                          fit="fill"
                          style="width: 40px; height: 40px;margin:0 4px"
                        >
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="item">申请人ID：{{ row.apply_list.recommend_usercode }}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="16">
                      <div
                        class="item"
                      >申请地址：{{row.apply_list.store_provincename}} {{row.apply_list.store_cityname}} {{row.apply_list.store_areaname}} {{row.apply_list.store_address}}</div>
                    </el-col>
                    <el-col :span="8">
                      <div
                        class="item"
                      >申请店铺图片：
                        <el-image
                          :src="row.apply_list.store_pics"
                          :preview-src-list="[row.apply_list.store_pics]"
                          fit="fill"
                          style="width: 80px; height: 80px;margin:0 4px"
                        >
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="id" width="50" title="ID"></vxe-table-column>
          <vxe-table-column field="title" title="门店名称"></vxe-table-column>
          <vxe-table-column field="pic" title="门店图">
            <template slot-scope="scope">
              <el-image
                v-for="(item,i) in scope.row.pics"
                :key="i"
                :src="item.name"
                :preview-src-list="[item.name]"
                fit="fill"
                style="width: 40px; height: 40px;margin:0 4px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="address" title="门店地址"></vxe-table-column>
          <vxe-table-column field="business_hours" title="营业时间"></vxe-table-column>
          <vxe-table-column field="myFlagship" title="是否旗舰店">
            <template slot-scope="scope">
              <el-switch @change="changeKG2(scope.row)" v-model="scope.row.myFlagship"></el-switch>
            </template>
          </vxe-table-column>
          <vxe-table-column field="myIs_status" title="状态(是否开启)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.myIs_status"></el-switch>
            </template>
          </vxe-table-column>
          <vxe-table-column title="操作" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" type="text" @click="addEditGuanliyuan(scope.row)">添加/修改管理员</el-button>
                <el-button size="small" type="text" @click="seeXiaoshou(scope.row)">销售</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.jifenshangpingliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加/修改管理员 -->
    <el-dialog
      title="添加/修改管理员"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form
          :model="addForm"
          :rules="rules"
          ref="addForm"
          label-width="100px"
          class="demo-addForm"
        >
          <el-row>
            <el-col :span="20">
              <el-form-item label="用户名">
                <el-input size="small" placeholder="请输入用户名" v-model="addForm.user_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="密码">
                <el-input size="small" placeholder="请输入密码" v-model="addForm.user_pass"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-radio-group v-model="addForm.status">
                  <el-radio label="1">开启</el-radio>
                  <el-radio label="0">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddOnSubmit('addForm')">提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- 销售列表 -->
    <el-dialog
      title="销售列表"
      :visible.sync="xsaddDialogVisible"
      width="700px"
      :before-close="xsaddHandleClose"
    >
      <div class="myForm">
        <el-form :inline="true" :model="xssearchForm" class="demo-form-inline">
          <el-form-item label="商品分类：">
            <el-date-picker
              size="small"
              v-model="xssearchForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="xssearchOnSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="myTable">
        <vxe-table align="center" :data="xstableData">
          <vxe-table-column field="goods_name" title="商品名称"></vxe-table-column>
          <vxe-table-column field="goods_img" title="商品图片">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.goods_img"
                :preview-src-list="[scope.row.goods_img]"
                fit="fill"
                style="width: 40px; height: 40px;margin:0 4px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="goods_price" title="商品价格"></vxe-table-column>
          <vxe-table-column field="goods_count" title="购买数量"></vxe-table-column>
          <vxe-table-column field="orders_amount" title="支付金额"></vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.xshandleSizeChange"
          @current-change="this.xshandleCurrentChange"
          :current-page="this.xiaoshoubiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.xstotal"
        ></el-pagination>
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
      "tabShopIndex",
      "jifenshangpingliebiaoPage",
      "jifenshangpingliebiaoPageSize",
      "xiaoshoubiaoPage",
      "xiaoshoubiaoPageSize"
    ])
  },
  watch: {
    tabShopIndex: function() {
      this.activeName = this.tabShopIndex;
      console.log(this.activeName);
      this.getData();
    },
    jifenshangpingliebiaoPage: function(page) {
      this.$store.commit("jifenshangpingliebiaoPage", page);
      this.getData();
    },
    jifenshangpingliebiaoPageSize: function(pageSize) {
      this.$store.commit("jifenshangpingliebiaoPageSize", pageSize);
      this.getData();
    },
    xiaoshoubiaoPage: function(page) {
      this.$store.commit("xiaoshoubiaoPage", page);
      this.getxsData();
    },
    xiaoshoubiaoPageSize: function(pageSize) {
      this.$store.commit("xiaoshoubiaoPageSize", pageSize);
      this.getxsData();
    }
  },
  data() {
    return {
      loading: false,
      activeName: "1",
      searchForm: {
        pid: "",
        status: "",
        keyword: ""
      },
      tableData: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        user_name: "",
        user_pass: "",
        status: "1"
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      imgStatus: "",
      imgFile: "",
      id: "",
      xsaddDialogVisible: false,
      xstableData: [],
      xssearchForm: {
        time: ""
      },
      xstotal: 0
    };
  },
  created() {
    this.$store.commit("jifenshangpingliebiaoPage", 1);
    this.$store.commit("jifenshangpingliebiaoPageSize", 10);
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      const res = await this.$api.store_list({
        page: this.jifenshangpingliebiaoPage,
        pagesize: this.jifenshangpingliebiaoPageSize
      });
      console.log(res);
      this.total = res.data.total;
      this.tableData = res.data.list;
      this.tableData.forEach(ele => {
        ele.myIs_status = ele.is_status == "1" ? true : false;
        ele.myFlagship = ele.flagship == 1 ? true : false;
      });
      this.loading = false;
    },
    async getxsData() {
      const res = await this.$api.store_engage({
        store_id: this.id,
        page: this.xiaoshoubiaoPage,
        pagesize: this.xiaoshoubiaoPageSize,
        beginday: this.xssearchForm.time[0],
        endday: this.xssearchForm.time[1]
      });
      console.log(res);
      this.xstableData = res.data.list;
      this.xstotal = res.data.total;
    },
    xssearchOnSubmit() {
      this.getxsData();
    },
    addEditGuanliyuan(row) {
      this.id = row.id;
      this.addForm.user_name = row.store_username;
      this.addForm.status = row.store_userstatus.toString();
      this.addDialogVisible = true;
    },
    seeXiaoshou(row) {
      this.id = row.id;
      this.xsaddDialogVisible = true;
    },
    xsaddHandleClose() {
      this.xsaddDialogVisible = false;
    },
    // 开关（显示/隐藏）
    async changeKG2(row) {
      console.log(row);
      const res = await this.$api.store_setflag({
        id: row.id,
        flag: row.myFlagship == true ? "1" : "0"
      });
      console.log(res);
      if (res.data.result == 1) {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.getData();
      }
    },
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.store_setstatus({
        id: row.id,
        status: row.myIs_status == true ? "1" : "0"
      });
      if (res.data.result == 1) {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.addDialogVisible = false;
        this.getData();
      }
    },
    tabsHandleClick(tab) {
      console.log(tab.index);
      this.$store.commit("tabShopIndex", (Number(tab.index) + 1).toString());
    },
    searchOnSubmit() {
      console.log(this.searchForm);
    },
    AddFenlei() {
      for (const key in this.addForm) {
        this.$set(this.addForm, key, "");
      }
      this.addDialogVisible = true;
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    tabEdit(row) {
      console.log(row);
      this.id = row.id;
      row.is_show = row.status == "0" ? "隐藏" : "显示";
      this.addForm = { ...row };
      this.addDialogVisible = true;
    },
    async tabDel(row) {
      console.log(row);
      const res = await this.$api.categoryDel(row.id);
      if (res) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        setTimeout(() => {
          this.getData();
        }, 500);
      } else {
        this.$message.error(res.msg);
      }
    },
    AddOnSubmit(formName) {
      console.log(this.addForm);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 新增
          const res = await this.$api.store_superuser({
            store_id: this.id,
            user_name: this.addForm.user_name,
            user_pass: this.addForm.user_pass,
            status: this.addForm.status
          });
          if (res.data.result == 1) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.addDialogVisible = false;
            this.getData();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除图片
    delImg(val) {
      if (val == "tb") {
        this.$set(this.addForm, "pic", "");
      } else if (this.imgStatus == "dt") {
        this.$set(this.addForm, "big_pic", "");
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("jifenshangpingliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("jifenshangpingliebiaoPage", val);
    },
    xshandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("xiaoshoubiaoPageSize", val);
    },
    xshandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("xiaoshoubiaoPage", val);
    },
    // 上传图片
    companyList(val) {
      this.imgStatus = val;
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      // console.log(file);
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = new FormData();
          this.imgFile.append("image[]", file);
          sessionStorage.setItem("img", 123);
          const res = await that.$api.productUpload(this.imgFile);
          console.log(res.data[0]);
          if (this.imgStatus == "tb") {
            this.$set(this.addForm, "pic", res.data[0]);
          } else if (this.imgStatus == "dt") {
            this.$set(this.addForm, "big_pic", res.data[0]);
          }
          that.$refs.fileInputList.value = "";
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
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
.tit1 {
  margin-top: 10px;
}
.myTable {
  .xiala {
    padding: 10px 20px;
    .item {
      font-size: 12px;
      display: flex;
    }
  }
  margin-top: 10px;
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
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
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
      vertical-align: middle;
    }
  }
  .tit1 {
    margin-top: 10px;
  }
  .myTable {
    margin-top: 10px;
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
    .flex {
      display: flex;
      align-items: center;
      justify-content: center;
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
.fenye {
  margin-top: 16px;
}
.displayN {
  display: none;
}
</style>