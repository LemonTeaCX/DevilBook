<template>
  <div class="erp-table account">
    <el-row class="form-box">
      <el-col :span="12">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-input
              v-model="searchVal"
              placeholder="请输入姓名或邮箱进行搜索"
              prefix-icon="el-icon-search"
              size="small"
              clearable>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button size="small" type="primary" plain icon="el-icon-search"
              @click="searchList()">搜索</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" justify="end">
          <el-button size="small" type="primary" @click="jumpAccountEdit(0)">添加</el-button>
          <el-button size="small" type="danger" @click="delAccount(tableDataChecked)">删除</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="tip-box">
      <el-alert
        title="在这里你可以管理本用户账号下的子账号，进行添加，删除，修改，查询等操作。"
        type="warning"
        show-icon
        :closable="false">
      </el-alert>
    </el-row>
    <el-row class="table-box">
      <!--:height="tableHeight"-->
      <el-table
        :data="tableData"
        @selection-change="checkedChange"
        border
        highlight-current-row
        >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          label="是否激活">
          <template slot-scope="scope">
            {{scope.row.status ? '激活' : '未激活'}}
          </template>
        </el-table-column>
        <el-table-column
          label="权限">
          <template slot-scope="scope">
            <div v-for="item in scope.row.auth" :key="item.id">{{item.name}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="role.name"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="jumpAccountEdit(scope.row.id || 0)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="delAccount([scope.row])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getAccountList, delAccount } from '../../api';
export default {
  name: 'account',
  data() {
    return {
      searchVal: '',
      pageIndex: 1,
      pageSize: 5,
      pageSizes: [5, 10, 20, 50, 100],
      tableData: [],
      tableDataChecked: [],
      total: 0
    };
  },
  mounted() {
    this.$store.dispatch('setAuthList');
    this.$store.dispatch('setRoleList');
    this.searchList();
  },
  computed: {
    ...mapState(['authList', 'roleList']),
    tableHeight() {
      return 300;
    }
  },
  methods: {
    async searchList(parms) {
      parms = Object.assign({
        searchVal: this.searchVal,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }, parms);

      let res = await getAccountList(parms);
      this.tableData = res.data.list;
      this.total = res.data.total;
    },
    checkedChange(arr) {
      this.tableDataChecked = arr;
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.searchList();
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.searchList();
    },
    jumpAccountEdit(id = 0) {
      let query = {};
      if (id) query.id = id;
      this.$router.push({
        path: '/system/accountEdit',
        query: query
      });
    },
    delAccount(data) {
      let [_this, names, ids] = [this, [], []];

      if (data.length === 0) {
        _this.$message({
          message: '请至少选择一条数据进行删除操作',
          type: 'error'
        });
        return ;
      }

      data.forEach(item => {
        names.push(item.name);
        ids.push(item.id);
      });

      _this.$confirm(`此操作将永久删除"${names.join('、')}"该账号，是否继续？`, '提示', {
        comfirmButtonTex: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await delAccount({ids: ids});

        _this.$message({
          message: result.msg,
          type: result.result ? 'success' : 'error'
        });
        this.searchList();
      }).catch(() => {});
    },
  }
}
</script>

<style lang="less">
.erp-table {
  height: 100%;
  padding: 20px;
  .form-box {
    margin-bottom: 12px;
  }
  .tip-box {
    margin-bottom: 12px;
  }
}
</style>
