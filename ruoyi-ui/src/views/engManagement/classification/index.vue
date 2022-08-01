<template>
  <div class="background">
    <div class="app-container" @click.stop="show=false">
      <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
        <el-form-item label="工程分类名称" prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入工程分类名称关键词"
            clearable
            style="width: 240px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <div class="edit">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5"  @click="show= false">
          <el-button
            type="primary"
            plain
            icon="el-icon-upload2"
            size="mini"
            @click="importTemplate"
          >下载Excel模板</el-button>
        </el-col>

        <el-col :span="1.5"  @click="show= false">
          <el-button
            type="primary"
            plain
            icon="el-icon-upload2"
            size="mini"
            @click="handleImport"
          >Excel批量导入</el-button>
        </el-col>



        <el-col :span="1.5"  @click="show= false">
          <el-button
            type="primary"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
          >Excel批量导出</el-button>
        </el-col>

        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-upload2"
            size="mini"
            @click.stop="show=true"
          >编辑</el-button>
        </el-col>
        <div v-show="show" class="edit" @click.stop="show=true">
          <el-button
            type="info"
            size="mini"
            @click="handleAddsame"
          >插入同级</el-button>

          <el-button
            type="info"
            size="mini"
            @click="handleAddson"
          >插入子集</el-button>


          <el-button
            icon="el-icon-edit"
            size="mini"
            @click="handleUpdate"
            :disabled="single"
          ></el-button>


          <el-button
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete"
            :disabled="multiple"
          ></el-button>

          <el-button
            icon="el-icon-bottom"
            size="mini"
            @click="moveDown"
          ></el-button>

          <el-button
            icon="el-icon-top"
            size="mini"
            @click="moveUp"
          ></el-button>

        </div>
      </el-row>
      <el-table
        @selection-change="handleSelectionChange"
        v-if="refreshTable"
        v-loading="loading"
        :data="engtypeList"
        row-key="id"
        :default-expand-all="isExpandAll"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :stripe="true"
        class="tableClass"
        :row-class-name='TableRowClassName'
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column label="工程分类名称" prop="name"/>
        <el-table-column label="编码"  prop="id" />
        <el-table-column label="分类级别"prop="level" />
        <el-table-column label="排序码"prop="orderno" />
        <el-table-column label="创建人" align="center" prop="createby" />
        <el-table-column label="修改人" align="center" prop="modifyby" />


      </el-table>

      <!-- 修改engtype对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">

          <el-form-item label="工程分类名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入工程分类名称" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button class="can" @click="cancel">取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog :title="title" :visible.sync="openadd" width="500px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="工程分类名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入工程分类名称" />
          </el-form-item>
          <el-form-item label="分类级别" prop="level">
            <el-input v-model="form.level" placeholder="请输入分类级别" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button type="primary" @click="submitF">确 定</el-button>
          <el-button class="can" @click="can">取 消</el-button>
        </div>
      </el-dialog>

      <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
        <el-upload
          ref="upload"
          :limit="1"
          accept=".xlsx, .xls"
          :headers="upload.headers"
          :action="upload.url + '?updateSupport=' + upload.updateSupport"
          :disabled="upload.isUploading"
          :on-progress="handleFileUploadProgress"
          :on-success="handleFileSuccess"
          :auto-upload="false"
          drag
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitFileForm">确 定</el-button>
          <el-button class="can" @click="upload.open = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import { listEngtype, getEngtype, delEngtype, addEngtype, updateEngtype ,getSame,getSameorderno,up,down,getSonorderno,getSon,getAllson} from "@/api/engtype/engtype";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {getToken} from "@/utils/auth";
import item from "@/layout/components/Sidebar/Item";


export default {
  name: "Engtype",
  components: {
    Treeselect
  },
  data() {
    return {
      openadd:false,
      single: true,
      multiple: true,
      show:false,
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
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/engtype/engtype/importData"
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
    let name = ''
    name = localStorage.getItem("name");
    console.log( name ) //新增测试

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
    getAllList() {
      this.loading = true;
      console.log(this.queryParams.name)
      getAllson(this.queryParams.name).then(response => {
        console.log(response.data)
        this.engtypeList = this.handleTree(response, "id", "parentid");
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
    can() {
      this.openadd = false;
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
      this.getAllList();
    },
    handleQueryall() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQueryall();
    },
    /** 插入同级操作 */
    handleAddsame() {
      this.reset();
      this.getTreeselect();
      const ID = this.pids;
      getSame(this.ids.find(item => item>0)).then(response => {
        console.log("给的id",this.ids.find(item => item>0),"id",response)
        this.form.id = response;
      });
      getSameorderno(this.ids.find(item => item>0)).then(response => {
        console.log("order",response)
        this.form.orderno= response;
      });
      this.form.parentid = ID.find(item => item>0);
      this.form.level =this.levels.find(item => item>0);
      this.openadd = true;
      this.title = "添加engtype";
    },
    /** 插入子级操作 */
    handleAddson() {
      this.reset();
      this.getTreeselect();
      console.log("给的id",this.ids.find(item => item>0),)
      getSon(this.ids.find(item => item>0)).then(response => {
        console.log("给的id",this.ids.find(item => item>0),"id",response)
        this.form.id = response;
      });
      getSonorderno(this.ids.find(item => item>0)).then(response => {
        console.log("order",response)
        this.form.orderno= response;

      });
      this.form.parentid = this.ids.find(item => item>0);
      const levels = this.levels.find(item => item>0)+1;
      this.form.level = levels;
      this.openadd = true;
      this.title = "添加engtype";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      const ID = row.id|| this.ids;
      console.log(ID)
      if (row != null) {
        this.form.parentid = ID;
      }
      getEngtype(ID).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改engtype";
      });
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateEngtype(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    submitF(){
      this.$refs["form"].validate(valid => {
        addEngtype(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.openadd = false;
              this.getList();
            });
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ID = this.ids.find(item => item>0);
      console.log(ID)
      this.$modal.confirm('是否确认删除engtype编号为"' + ID + '"的数据项？').then(function() {
        return delEngtype(ID);

      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('engtype/engtype/export', {
        ...this.queryParams
      }, `user_${new Date().getTime()}.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('engtype/engtype/importTemplate', {
      }, `user_template_${new Date().getTime()}.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      console.log(response)
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + "恭喜你，数据已经全部导入！" + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },



    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
      this.pids = selection.map(item => item.parentid);
      this.levels = selection.map(item => item.level);
      this.indexs = selection.$index;
      this.ordernos = selection.map(item => item.orderno);
      console.log(selection)
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.handleQuery();
    },
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    TableRowClassName({row, rowIndex}) {
      row.index = rowIndex
      if (rowIndex%2==1) {
        return 'statistics-warning-row'
      } else {
        return ''
      }
    },
    moveUp(){
      up(this.ids).then(response => {
        if(response == 0){
          this.$modal.msgSuccess("上移成功");
        }
        else{
          this.$modal.msgSuccess("该数据是第一项，无法上移");
        }

        this.getList();
      });
    },
    moveDown(){
      down(this.ids).then(response => {
        if(response == 0){
          this.$modal.msgSuccess("下移成功");
        }
        else{
          this.$modal.msgSuccess("该数据是最后一项，无法下移");
        }
        this.getList();
      });
    }

  }
};

</script>



<style>
.edit{
  float: right;
}
.statistics-warning-row {
  background: #d9d9d9 !important;
}
.can{
  margin-top: 2px;
  width: 74px;
  font-size: 14px;
  border-radius: 4px;
  border:1px solid #000;
  height: 36px;

}
.app-main{
  background: #d9d9d9;
}

.app-container{
  background:#FFFFFF;
}


</style>
