<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">推荐人列表</div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="20">
              <el-form-item label="推荐人：">
                <el-select
                  size="small"
                  v-model="formInline.recommend_userid"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="`${item.nickname}(${item.mobile})`"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" @click="searchOnSubmit">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div> -->
      <!-- <div class="tit1">
        <el-button @click="AddLunbotu" size="small" type="primary" icon="el-icon-plus">添加轮播图</el-button>
      </div>-->
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" width="50" title="ID"></vxe-table-column>
          <vxe-table-column field="nickname" title="用户名"></vxe-table-column>
          <vxe-table-column field="realname" title="姓名"></vxe-table-column>
          <vxe-table-column field="image" title="用户头像">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.facepic"
                :preview-src-list="[scope.row.facepic]"
                fit="fill"
                style="width: 40px; height: 40px;"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="user_code" title="用户id"></vxe-table-column>
          <vxe-table-column field="mobile" title="手机号"></vxe-table-column>
          <vxe-table-column field="email" title="邮箱"></vxe-table-column>
          <vxe-table-column field="idcard" title="身份证号"></vxe-table-column>
          <!-- <vxe-table-column field="is_show" title="状态(是否显示)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.isShow"></el-switch>
            </template>
          </vxe-table-column>-->
          <!-- <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="tabEdit(scope.row)" type="text">编辑</el-button>
                <el-button size="small" @click="tabDel(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>-->
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.lunbotuliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑轮播图 -->
    <el-dialog
      title="编辑轮播图"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
    >
      <div class="nav2">
        <div class="myForm">
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-col :span="18">
                <el-form-item label="设置轮播图：">
                  <div @click="companyList" class="myImg">
                    <el-image :src="ruleForm.pic" fit="fill" style="width: 200px; height: 200px">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <div @click.stop="delImg" class="closeBtn">
                      <el-button circle>×</el-button>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="跳转类型：">
                  <el-select size="small" v-model="ruleForm.url_type" placeholder="请选择">
                    <el-option label="内部链接" :value="1"></el-option>
                    <el-option label="外部链接" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="跳转地址：">
                  <el-input size="small" v-model="ruleForm.url"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="状态">
                  <el-radio-group v-model="ruleForm.is_status">
                    <el-radio :label="1">显示</el-radio>
                    <el-radio :label="0">隐藏</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button
                icon="el-icon-s-promotion"
                size="small"
                type="primary"
                @click="submitForm"
              >提交</el-button>
            </el-form-item>
          </el-form>
        </div>
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
    ...mapState(["lunbotuliebiaoPage", "lunbotuliebiaoPageSize"])
  },
  watch: {
    lunbotuliebiaoPage: function(page) {
      this.$store.commit("lunbotuliebiaoPage", page);
      this.getData();
    },
    lunbotuliebiaoPageSize: function(pageSize) {
      this.$store.commit("lunbotuliebiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      options: [],
      isAdd: false,
      radioArr: [],
      radioArr2: [],
      formInline: {
        recommend_userid: "",
        time: []
      },
      tableData: [],
      total: 0,
      dialogVisible: false,
      imgFile: "",
      ruleForm: {
        pic: "",
        url: "",
        url_type: "",
        is_status: 1
      },
      id: "",
      fenleiData: []
    };
  },
  created() {
    this.$store.commit("lunbotuliebiaoPageSize", 10);
    this.$store.commit("lunbotuliebiaoPage", 1);
    this.getFenleiData();
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.userrecommend_list({
        pagesize: this.lunbotuliebiaoPageSize,
        page: this.lunbotuliebiaoPage
      });
      console.log(res.data);
      if (res.data.total > 0) {
        this.tableData = res.data.list;
      } else {
        this.tableData = [];
      }
      this.total = res.data.total;
      // this.tableData.forEach(ele => {

      // });
    },
    async getFenleiData() {
      const res = await this.$api.userrecommend_list({
        page: 1,
        pagesize: 10000000
      });
      this.options = res.data.list;
    },
    searchOnSubmit() {
      this.getData();
    },
    changRad1() {
      this.getData();
    },
    AddLunbotu() {
      for (const key in this.ruleForm) {
        this.$set(this.ruleForm, key, "");
        this.isAdd = true;
      }
      this.dialogVisible = true;
    },
    changeRad() {
      console.log(this.formInline.rad1);
      this.getData();
    },
    // 编辑
    tabEdit(row) {
      console.log(row);
      this.isAdd = false;
      this.id = row.id;
      this.ruleForm.pic = row.pic;
      this.ruleForm.url_type = row.url_type;
      this.ruleForm.url = row.url;
      this.ruleForm.is_status = row.is_status;
      this.dialogVisible = true;
    },
    // 删除
    async tabDel(row) {
      const res = await this.$api.del_equip({ id: row.id });
      if (res.data.result == 1) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getData();
      }
    },
    // 提交
    async submitForm() {
      if (this.isAdd) {
        // 添加
        const res = await this.$api.add_swiper({
          pic: this.ruleForm.pic,
          url_type: this.ruleForm.url_type,
          url: this.ruleForm.url,
          is_status: this.ruleForm.is_status
        });
        console.log(res);
        if (res.data.result == 1) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.dialogVisible = false;
          this.getData();
        }
      } else {
        // 编辑
        const res = await this.$api.edit_swiper({
          id: this.id,
          pic: this.ruleForm.pic,
          url_type: this.ruleForm.url_type,
          url: this.ruleForm.url,
          is_status: this.ruleForm.is_status
        });
        console.log(res);
        if (res) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.getData();
          this.dialogVisible = false;
        }
      }
    },
    // 开关（显示/隐藏）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.setstatus_equip({
        id: row.id,
        is_status: row.is_status == "1" ? "0" : "1"
      });
      if (res.data.result == 1) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.addDialogVisible = false;
        this.getData();
      }
    },
    // 上传图片
    companyList() {
      this.$refs.fileInputList.click();
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
          this.imgFile.append("pic", file);
          this.imgFile.append("token", sessionStorage.getItem("token"));
          sessionStorage.setItem("img", 123);
          const res = await that.$api.upload_pic(this.imgFile);
          this.$set(this.ruleForm, "pic", res.data.pic_url);
          that.$refs.fileInputList.value = "";
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    // 删除图片
    delImg() {
      this.$set(this.ruleForm, "pic", "");
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("lunbotuliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("lunbotuliebiaoPage", val);
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
    }
    /deep/ .el-select {
      width: 100%;
    }
    .search {
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
  .myImg {
    position: relative;
    width: 200px;
    height: 200px;
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
      width: 198px;
      height: 198px;
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