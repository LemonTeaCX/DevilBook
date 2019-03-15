<template>
  <div class="menu">
    <el-table
      :data="tableData"
      border>
      <el-table-column label="id">
        <template slot-scope="scope">
          <input-text :text="scope.row.id"></input-text>
        </template>
      </el-table-column>
      <el-table-column label="parent_id">
        <template slot-scope="scope">
        </template>
      </el-table-column>
      <el-table-column label="menu">
        <template slot-scope="scope">
        </template>
      </el-table-column>
      <el-table-column
        prop="icon"
        label="icon">
      </el-table-column>
      <el-table-column
        prop="path"
        label="path">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="remark">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMenuList } from '../../api';
import InputText from '../../components/inputText'
export default {
  name: 'Menu',
  components: { InputText },
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.initMenu();
    setInterval(() => {
      // console.log(this.tableData);
    }, 3000);
  },
  methods: {
    async initMenu() {
      let result = await getMenuList();
      this.tableData = result.data || [];
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
}
</style>
