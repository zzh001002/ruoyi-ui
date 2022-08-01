<template>
  <el-row>
  <el-col :span="12"><div class="grid-content bg-purple">
    <el-form-item label="公司名称(中文):" prop="nameC">
      <el-input v-model="formData.nameC" clearable :style="{width: '100%'}">
      </el-input>
    </el-form-item>
  </div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light">
    <el-form-item label="地址:">
      <el-select v-model="formData.address1" placeholder="省" clearable :style="{width: '100%'}">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
      <el-select v-model="formData.address2" placeholder="市" clearable :style="{width: '100%'}">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
      <el-select v-model="formData.address1" placeholder="区/县" clearable :style="{width: '100%'}">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </div></el-col>
  </el-row>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        nameC: undefined,
        nameE: undefined,
        nameJc: undefined,
        nameF: undefined,
        address1:undefined,
        address2:undefined,
        address3:undefined,
        classificationHeight:undefined
      },
      rules1:{
        nameE: [{
          required: false,
          message: '请输入公司名称(英文)',
          trigger: 'blur'
        }],
        nameC: [{
          required: true,
          message: '请输入公司名称(中文)',
          trigger: 'blur'
        },{
          pattern: /[^\u4E00-\u9FA5]/g,
          message: '请输入中文名称',
          trigger: 'blur'
        }],
        nameJc: [{
          required: true,
          message: '请输入公司简称(中文)',
          trigger: 'blur'
        }],
        nameF: [{
          required: true,
          message: '请输入公司首字母组合',
          trigger: 'blur'
        }],
      },
      field106Action: 'https://jsonplaceholder.typicode.com/posts/',
      field106fileList: [],
      address1Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      address2Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      address3Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      field109Options: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    field106BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      return isRightSize
    },
  }
}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}
.body{
  font-size: 14px;
  margin:auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.el-row{
  background: #FFFFFF;
}

</style>
