<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">圈子管理</div>
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
            <el-radio-group v-model="formInline.rad1" size="small" @change="changRad1">
              <el-radio-button label="0">全部</el-radio-button>
              <el-radio-button label="1">动态</el-radio-button>
              <el-radio-button label="2">任务</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item>
            <el-button size="small" type="primary" @click="searchOnSubmit"
              >查询</el-button
            >
          </el-form-item>-->
        </el-form>
      </div>
      <!-- <div class="tit1">
        <el-button @click="AddFenlei" size="small" type="primary" icon="el-icon-plus">添加战术</el-button>
      </div>-->
      <div class="myTable">
        <vxe-table
          :loading="loading"
          :tree-config="{
            children: 'children',
          }"
          align="center"
          :data="tableData"
        >
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="user_nickname" title="发布者名称"></vxe-table-column>
          <vxe-table-column field="pic" title="发布者头像">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.user_facepic"
                :preview-src-list="[scope.row.user_facepic]"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="content" title="内容"></vxe-table-column>
          <vxe-table-column field="pic" title="图片">
            <template slot-scope="scope">
              <el-image
                v-for="(item,i) in scope.row.pics"
                :key="i"
                :src="item.name"
                :preview-src-list="[item.name]"
                fit="fill"
                style="width: 40px; height: 40px;margin:2px;"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="fav_num" title="点赞数"></vxe-table-column>
          <vxe-table-column field="comment_num" title="评论数"></vxe-table-column>
          <vxe-table-column field="myIs_gather" title="状态"></vxe-table-column>
          <vxe-table-column field="myIs_status" title="是否置顶"></vxe-table-column>
          <vxe-table-column field="createday" title="发布时间"></vxe-table-column>
          <vxe-table-column title="操作" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button
                  :disabled="scope.row.theme_id == 0 || scope.row.is_gather == 1"
                  size="small"
                  type="text"
                  @click="caiji(scope.row)"
                >采集</el-button>
                <el-button size="small" type="text" @click="tabDel(scope.row)">删除</el-button>
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
    <!-- 添加战术 -->
    <el-dialog
      title="添加战术"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-addForm">
          <el-row>
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
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="标题" prop="name">
                <el-input size="small" placeholder="请输入标题" v-model="addForm.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="封面图片">
                <div @click="companyList('tb')" class="myImg">
                  <el-image :src="addForm.cover_pic" fit="fill" style="width: 60px; height: 60px">
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
              <el-form-item label="战术内容" prop="name">
                <el-input
                  size="small"
                  placeholder="请输入战术内容"
                  type="textarea"
                  v-model="addForm.content"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="类型">
                <el-radio-group v-model="addForm.type">
                  <el-radio label="服务商品"></el-radio>0
                  <el-radio label="商城商品"></el-radio>1
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>-->
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
      formInline: {
        rad1: "0"
      },
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
        id: "",
        store_id: [],
        title: "",
        cover_pic: "",
        content: "",
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
    this.$store.commit("jifenshangpingliebiaoPage", 1);
    this.$store.commit("jifenshangpingliebiaoPageSize", 10);
    this.getData();
    // this.getMendianData();
  },
  methods: {
    async getData() {
      this.loading = true;
      this.activeName = this.tabShopIndex;
      const res = await this.$api.circle_list({
        page: this.jifenshangpingliebiaoPage,
        pagesize: this.jifenshangpingliebiaoPageSize,
        column: this.formInline.rad1
      });
      console.log(res);
      this.total = res.data.total;
      this.tableData = res.data.list;
      this.tableData.forEach(ele => {
        ele.myIs_status = ele.is_top == "1" ? "是" : "否";
        ele.myIs_gather = ele.is_gather == "1" ? "已采集" : "未采集";
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
    changRad1() {
      this.getData();
    },
    // 开关（显示/隐藏）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.updateCategories(
        {
          name: row.name,
          sort: row.sort,
          status: row.is_showKG == true ? "1" : "0"
        },
        row.id
      );
      if (res) {
        this.$message({
          message: res.msg,
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
      this.addForm = { ...row };
      this.addForm.is_status = row.is_status.toString();
      this.addForm.store_id = row.store_id.split(",");
      this.addForm.store_id.forEach((ele, i) => {
        this.$set(this.addForm.store_id, i, Number(ele));
      });
      this.addDialogVisible = true;
    },
    async caiji(row){
      const res = await this.$api.circle_setgather({ id: row.id });
      if (res.data.result == 1) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.addDialogVisible = false;
        this.getData();
      } else {
        this.$message.error(res.msg);
      }
    },
    async tabDel(row) {
      const res = await this.$api.del_circle({ id: row.id });
      if (res.data.result == 1) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.addDialogVisible = false;
        this.getData();
      } else {
        this.$message.error(res.msg);
      }
    },
    async AddOnSubmit() {
      if (this.addForm.id == "" && this.addForm.id != 0) {
        // 新增
        const res = await this.$api.add_tactics({
          store_id: this.addForm.store_id.toString(),
          title: this.addForm.title,
          cover_pic: this.addForm.cover_pic,
          content: this.addForm.content,
          is_status: this.addForm.is_status
        });
        if (res.data.result == 1) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.addDialogVisible = false;
          this.getData();
        }
      } else {
        // 编辑
        const res = await this.$api.edit_tactics({
          id: this.addForm.id,
          store_id: this.addForm.store_id.toString(),
          title: this.addForm.title,
          cover_pic: this.addForm.cover_pic,
          content: this.addForm.content,
          is_status: this.addForm.is_status
        });
        if (res.data.result == 1) {
          this.$message({
            message: res.msg,
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
            this.$set(this.addForm, "cover_pic", res.data.pic_url);
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
.fenye {
  margin-top: 20px;
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