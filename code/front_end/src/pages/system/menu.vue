<template>
  <div class="menu">
    <el-row class="btns">
      <el-col :span="24" class="tar">
        <el-button type="primary" size="small" @click="add">添加</el-button>
        <el-button type="primary" size="small" @click="reset">重置</el-button>
        <el-button type="primary" size="small" @click="save">保存</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border>
      <el-table-column label="id">
        <template slot-scope="scope">
          <input-text :text="scope.row.id" @changeText="scope.row.id = +($event || 0)" />
        </template>
      </el-table-column>
      <el-table-column label="parent_id">
        <template slot-scope="scope">
          <input-text :text="scope.row.parent_id" @changeText="scope.row.parent_id = +($event || 0)" />
        </template>
      </el-table-column>
      <el-table-column label="menu">
        <template slot-scope="scope">
          <input-text :text="scope.row.menu" @changeText="scope.row.menu = $event || ''" />
        </template>
      </el-table-column>
      <el-table-column label="icon">
        <template slot-scope="scope">
          <input-text :text="scope.row.icon" @changeText="scope.row.icon = $event || ''" />
        </template>
      </el-table-column>
      <el-table-column label="path">
        <template slot-scope="scope">
          <input-text :text="scope.row.path" @changeText="scope.row.path = $event || ''" />
        </template>
      </el-table-column>
      <el-table-column label="remark">
        <template slot-scope="scope">
          <input-text :text="scope.row.remark" @changeText="scope.row.remark = $event || ''" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMenuList, editMenu, delMenu } from '../../api';
import InputText from '../../components/inputText';
import Util from '../../util/util';
export default {
  name: 'Menu',
  components: { InputText },
  data() {
    return {
      tableData: [],
      originalTableData: []
    }
  },
  mounted() {
    this.initMenu();
  },
  methods: {
    async initMenu() {
      let result = await getMenuList();
      this.tableData = result.data || [];
      this.originalTableData = Util.copyJson(this.tableData);
    },
    add() {
      this.tableData.unshift({});
    },
    reset() {
      this.tableData = this.originalTableData;
    },
    async save() {
      let result = await editMenu(this.tableData);
      this.$message({
        message: result.msg,
        type: result.result ? 'success': 'error'
      });
      this.initMenu();
    },
    async del(row = {}) {
      let _this = this;
      _this.$confirm(`此操作将永久删除"${row.menu}"该菜单，是否继续？`, '提示', {
        comfirmButtonTex: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await delMenu({ids: [row.id || 0]});
        _this.$message({
          message: result.msg,
          type: result.result ? 'success': 'error'
        });
        _this.initMenu();
      }).catch(() => {});

      
    }
  }
}
</script>

<style lang="less" scoped>
.menu {
  margin: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 0 20px #ccc;
  .btns {
    margin-bottom: 18px;
  }
}
</style>
