<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">积分商品管理</div>
      <!-- <div class="tit2">
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="如商城商品" name="1"></el-tab-pane>
          <el-tab-pane label="服务商品" name="2"></el-tab-pane>
        </el-tabs>
      </div> -->
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="商品搜索：">
            <el-input size="small" v-model="formInline.name" placeholder="商品搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
            <el-button size="small" @click="onReact">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加商品</el-button>
      </div>
      <div class="myTable">
        <vxe-table height='700' :loading="loading" :data="tableData">
          <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <!-- <el-col :span="6">
                      <div class="item">商品分类：{{row.myCategory}}</div>
                    </el-col> -->
                    <el-col :span="8">
                      <div class="item">商品创建时间：{{row.created_at}}</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="item">描述：{{ row.desc }}</div>
                    </el-col>
                  </el-row>
                  <!-- <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">收藏：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">虚拟销量：3C数码/手机</div>
                    </el-col>
                  </el-row>-->
                </div>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="id" title="商品ID"></vxe-table-column>
          <vxe-table-column field="role" title="商品主图">
            <template slot-scope="scope">
              <el-image :src="scope.row.main_image" :preview-src-list="[scope.row.main_image]" fit="fill" style="width: 40px; height: 40px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="role" width="180" title="商品浏览图">
            <template slot-scope="scope">
              <el-image
                v-for="(item,i) in scope.row.image_gallery"
                :preview-src-list="[item]"
                :key="i"
                :src="item"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="title" title="商品名称"></vxe-table-column>
          <vxe-table-column field="price" title="商品售价"></vxe-table-column>
          <vxe-table-column field="weight" title="重量"></vxe-table-column>
          <vxe-table-column field="sale_count" title="销量"></vxe-table-column>
          <vxe-table-column field="sort" title="排序"></vxe-table-column>
          <vxe-table-column field="myStatus" title="状态(是否上架)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.myStatus"></el-switch>
            </template>
          </vxe-table-column>
          <vxe-table-column title="操作状态" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="toEditShop(scope.row)" type="text">编辑</el-button>
                <!-- <el-button size="small" @click="toEditShop(scope.row)" type="text">查看评论</el-button> -->
                <el-button size="small" @click="toDelShop(scope.row)" type="text">删除</el-button>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      "jifenshangpingliebiaoPage",
      "jifenshangpingliebiaoPageSize",
      "tabIndex"
    ])
  },
  watch: {
    jifenshangpingliebiaoPage: function(page) {
      this.$store.commit("jifenshangpingliebiaoPage", page);
      this.getData();
    },
    jifenshangpingliebiaoPageSize: function(pageSize) {
      this.$store.commit("jifenshangpingliebiaoPageSize", pageSize);
      this.getData();
    },
    tabIndex: function() {
      this.activeName = this.tabIndex;
      console.log(this.activeName);
      this.getData();
    }
  },
  data() {
    return {
      loading:false,
      activeName: "1",
      formInline: {
        category_id: "",
        name: ""
      },
      options: [],
      tableData: [],
      total: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      this.activeName = this.tabIndex;
      const res = await this.$api.scoreItems({
        limit: this.jifenshangpingliebiaoPageSize,
        page: this.jifenshangpingliebiaoPage,
        keyword:this.formInline.name
      });
      console.log(res);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        ele.myStatus = ele.status == "1" ? true : false;
        ele.image_gallery.forEach(item => {
          if (!item) {
            ele.image_gallery.pop();
          }
        });
      });
      this.loading = false;
    },
    // 开关（上架/下架）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.upDateScoreItems(
        {
          status: row.myStatus == true ? "1" : "0"
        },
        row.id
      );
      if (res) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    toEditShop(row) {
      console.log(row);
      this.$store.commit("shopObj", row);
      this.$router.push({ name: "Tianjiajifenshangping" });
    },
    async toDelShop(row) {
      console.log(row);
      const res = await this.$api.deleteScoreItems(row.id);
      if (res) {
        this.$message({
          message: '删除成功',
          type: "success"
        });
        this.getData();
      }
    },
    tabsHandleClick(tab) {
      console.log(tab.index);
      this.$store.commit("tabIndex", (Number(tab.index) + 1).toString());
      this.formInline.category_id = "";
      this.formInline.name = "";
    },
    onSubmit() {
      console.log(this.formInline);
      this.getData();
    },
    onReact() {
      this.formInline.category_id = "";
      this.formInline.name = "";
      this.getData();
    },
    toAddShop() {
      this.$store.commit("shopObj", null);
      this.$router.push({ name: "Tianjiajifenshangping" });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("jifenshangpingliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("jifenshangpingliebiaoPage", val);
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
</style>