<template>
  <div class="index">
    <div class="nav2">
      <el-empty description="暂无权限/页面不存在"></el-empty>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index {
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
    margin-top: 100px;
  }
}
</style>