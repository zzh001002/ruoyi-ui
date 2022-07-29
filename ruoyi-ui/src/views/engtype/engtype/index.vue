<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="工程分类名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入工程分类名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
	    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['engtype:engtype:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-sort"
          size="mini"
          @click="toggleExpandAll"
        >展开/折叠</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="engtypeList"
      row-key="id"
      :default-expand-all="isExpandAll"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="工程分类名称" prop="name" :render-header="renderHeader"/>
      <el-table-column label="分类级别" align="center" prop="level" />
      <el-table-column label="排序码" align="center" prop="orderno" />
      <el-table-column label="创建人" align="center" prop="createby" />
      <el-table-column label="修改人" align="center" prop="modifyby" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['engtype:engtype:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['engtype:engtype:add']"
          >新增</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['engtype:engtype:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改engtype对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属公司ID" prop="ownerid">
          <el-input v-model="form.ownerid" placeholder="请输入所属公司ID" />
        </el-form-item>
        <el-form-item label="编码" prop="id">
          <el-input v-model="form.id" placeholder="请输入编码" />
        </el-form-item>
        <el-form-item label="工程分类名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入工程分类名称" />
        </el-form-item>
        <el-form-item label="分类级别" prop="level">
          <el-input v-model="form.level" placeholder="请输入分类级别" />
        </el-form-item>
        <el-form-item label="排序码" prop="orderno">
          <el-input v-model="form.orderno" placeholder="请输入排序码" />
        </el-form-item>
        <el-form-item label="最后一次修改时间" prop="modifytime">
          <el-date-picker clearable
            v-model="form.modifytime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择最后一次修改时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="修改人" prop="modifyby">
          <el-input v-model="form.modifyby" placeholder="请输入修改人" />
        </el-form-item>
        <el-form-item label="父亲ID" prop="parentid">
          <treeselect v-model="form.parentid" :options="engtypeOptions" :normalizer="normalizer" placeholder="请选择父亲ID" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listEngtype, getEngtype, delEngtype, addEngtype, updateEngtype } from "@/api/engtype/engtype";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Engtype",
  components: {
    Treeselect
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // engtype表格数据
      engtypeList: [],
      // engtype树选项
      engtypeOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      // 查询参数
      queryParams: {
        name: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询engtype列表 */
    getList() {
      this.loading = true;
      listEngtype(this.queryParams).then(response => {
        this.engtypeList = this.handleTree(response.data, "id", "parentid");
        this.loading = false;
      });
    },
    /** 转换engtype数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      };
    },
	/** 查询engtype下拉树结构 */
    getTreeselect() {
      listEngtype().then(response => {
        this.engtypeOptions = [];
        const data = { id: 0, name: '顶级节点', children: [] };
        data.children = this.handleTree(response.data, "id", "parentid");
        this.engtypeOptions.push(data);
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        ownerid: null,
        name: null,
        id: null,
        level: null,
        orderno: null,
        createtime: null,
        createby: null,
        modifytime: null,
        modifyby: null,
        parentid: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.getTreeselect();
      console.log(row.id)
      if (row != null && row.id) {
        this.form.parentid = row.id;
        console.log(this.form.parentid);
      } else {
        this.form.parentid = 0;
      }
      this.open = true;
      this.title = "添加engtype";
    },
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      console.log(row)
      this.reset();
      this.getTreeselect();
      if (row != null) {
        this.form.parentid = row.id;
      }
      getEngtype(row.id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改engtype";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        addEngtype(this.form).then(response => {
          this.$modal.msgSuccess("新增成功");
          this.open = false;
          this.getList();
        });
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$modal.confirm('是否确认删除engtype编号为"' + row.id + '"的数据项？').then(function() {
        return delEngtype(row.id);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    }
  }
};
</script>

<style>
.edit{
  margin-left: 350px;
}
.el-button el-button--default el-button--medium{
  border-radius: 50%;
}
</style>
