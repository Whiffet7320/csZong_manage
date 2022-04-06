<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">主题管理</div>
      <!-- <div class="tit2">
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="如商城商品分类" name="1"></el-tab-pane>
          <el-tab-pane label="服务商品分类" name="2"></el-tab-pane>
        </el-tabs>
      </div>-->
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="类型：">
            <el-radio-group v-model="searchForm.rad1" size="small" @change="changRad1">
              <el-radio-button label="0">全部</el-radio-button>
              <el-radio-button label="1">动态</el-radio-button>
              <el-radio-button label="2">任务</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="商品分类：">
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
          </el-form-item> -->
        </el-form>
      </div>
      <div class="tit1">
        <el-button @click="AddFenlei" size="small" type="primary" icon="el-icon-plus">添加主题</el-button>
      </div>
      <div class="myTable">
        <vxe-table
          height="700"
          :loading="loading"
          :tree-config="{
            children: 'children',
          }"
          align="center"
          :data="tableData"
        >
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="title" title="标题"></vxe-table-column>
          <vxe-table-column field="rule" title="规则"></vxe-table-column>
          <vxe-table-column field="pic" title="封面图">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.cover"
                :preview-src-list="[scope.row.cover]"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
           <vxe-table-column field="pic" title="banner图">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.banner"
                :preview-src-list="[scope.row.banner]"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="myColumn" title="栏目"></vxe-table-column>
          <vxe-table-column field="myIs_status" title="状态(是否开启)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.myIs_status"></el-switch>
            </template>
          </vxe-table-column>
          <vxe-table-column title="操作" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" type="text" @click="tabEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="text" @click="tabDel(scope.row)">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <!-- 添加/修改主题 -->
    <el-dialog
      title="添加/修改主题"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-addForm">
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="门店">
                <el-select
                  size="small"
                  v-model="addForm.store_id"
                  filterable
                  multiple
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="`${item.title}(${item.address})`"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="20">
              <el-form-item label="标题" prop="name">
                <el-input size="small" placeholder="请输入标题" v-model="addForm.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="规则" prop="name">
                <el-input type="textarea" size="small" placeholder="请输入规则" v-model="addForm.rule"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="封面图片">
                <div @click="companyList('tb')" class="myImg">
                  <el-image :src="addForm.cover" fit="fill" style="width: 60px; height: 60px">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <div @click.stop="delImg('tb')" class="closeBtn">
                    <el-button circle>×</el-button>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="banner图">
                <div @click="companyList('banner')" class="myImg">
                  <el-image :src="addForm.banner" fit="fill" style="width: 60px; height: 60px">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <div @click.stop="delImg('banner')" class="closeBtn">
                    <el-button circle>×</el-button>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="栏目">
                <el-radio-group v-model="addForm.column">
                  <el-radio label="1">动态</el-radio>
                  <el-radio label="2">任务</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-radio-group v-model="addForm.is_status">
                  <el-radio label="1">显示</el-radio>
                  <el-radio label="0">隐藏</el-radio>
                </el-radio-group>
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
      "tabShopIndex",
      "jifenshangpingliebiaoPage",
      "jifenshangpingliebiaoPageSize"
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
    }
  },
  data() {
    return {
      loading: false,
      activeName: "1",
      searchForm: {
        pid: "",
        status: "",
        keyword: "",
        rad1:'0',
      },
      tableData: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        id: "",
        title: "",
        rule: "",
        cover: "",
        banner: "",
        column:'',
        is_status: "1"
      },
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        is_show: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      imgStatus: "",
      imgFile: "",
      id: "",
      options: []
    };
  },
  created() {
    this.getData();
    // this.getMendianData();
  },
  methods: {
    async getData() {
      this.loading = true;
      this.activeName = this.tabShopIndex;
      const res = await this.$api.theme_list({
        page: this.jifenshangpingliebiaoPage,
        pagesize: this.jifenshangpingliebiaoPageSize,
        column:this.searchForm.rad1
      });
      console.log(res);
      this.total = res.data.total;
      this.tableData = res.data.list;
      this.tableData.forEach(ele => {
        ele.myIs_status = ele.is_status == "1" ? true : false;
        ele.myColumn = ele.column == '1' ? '动态' : '任务'
      });
      this.loading = false;
    },
    async getMendianData() {
      const res = await this.$api.store_list({
        pagesize: 100000,
        page: 1
      });
      this.options = res.data.list;
    },
    // 开关（显示/隐藏）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.setstatus_theme(
        {
          id:row.id,
          is_status: row.myIs_status == true ? "1" : "0"
        },
      );
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
    changRad1(){
      this.getData()
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    tabEdit(row) {
      console.log(row);
      this.id = row.id;
      this.addForm = { ...row };
      this.addForm.is_status = row.is_status.toString();
      this.addForm.column = row.column.toString();
      this.addDialogVisible = true;
    },
    async tabDel(row) {
      const res = await this.$api.del_theme({ id: row.id });
      if (res.data.result == 1) {
        this.$message({
          message: res.data.msg,
          type: "success"
        });
        this.addDialogVisible = false;
        this.getData();
      } else {
        this.$message.error(res.data.msg);
      }
    },
    async AddOnSubmit() {
      if (this.addForm.id == "") {
        // 新增
        const res = await this.$api.add_theme({
          title: this.addForm.title,
          rule: this.addForm.rule,
          cover: this.addForm.cover,
          banner: this.addForm.banner,
          column: this.addForm.column,
          is_status: this.addForm.is_status
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
        // 编辑
        const res = await this.$api.edit_theme({
          id: this.addForm.id,
          title: this.addForm.title,
          rule: this.addForm.rule,
          cover: this.addForm.cover,
          banner: this.addForm.banner,
          column: this.addForm.column,
          is_status: this.addForm.is_status
        });
        if (res.data.result == 1) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.addDialogVisible = false;
          this.getData();
        }
      }
    },
    // 删除图片
    delImg(val) {
      if (val == "tb") {
        this.$set(this.addForm, "cover", "");
      } else if (this.imgStatus == "banner") {
        this.$set(this.addForm, "banner", "");
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
          this.imgFile.append("pic", file);
          this.imgFile.append("token", sessionStorage.getItem("token"));
          sessionStorage.setItem("img", 123);
          const res = await that.$api.upload_pic(this.imgFile);
          if (this.imgStatus == "tb") {
            this.$set(this.addForm, "cover", res.data.pic_url);
          }else if (this.imgStatus == "banner") {
            this.$set(this.addForm, "banner", res.data.pic_url);
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
.displayN {
  display: none;
}
</style>