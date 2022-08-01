<template>
  <div class="body">
    <el-form :inline="true" ref="elForm":model="formData":rules="rules1"label-width="140px"class="demo-form-inline">
      <el-form-item label="公司名称(中文):" prop="nameC"span="24"style="width:403px;">
        <el-input v-model="formData.nameC" clearable  style="width:250px;">
        </el-input>
      </el-form-item>
      <el-form-item label="地址:"span="8"requireds style="width:403px;">
        <el-row :gutter="5">
          <el-col :span="8">
            <el-select v-model="formData.address1" placeholder="省" clearable  style="width:80px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select v-model="formData.address2" placeholder="市" clearable style="width:80px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select v-model="formData.address3" placeholder="区/县" clearable style="width:80px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <el-form :inline="true" ref="elForm":model="formData":rules="rules1"label-width="140px"class="demo-form-inline">
      <el-form-item label="公司名称(英文):" prop="nameE"label-width="140px" style="width:403px;">
        <el-input v-model="formData.nameE" clearable style="width:250px;">
        </el-input>
      </el-form-item>
      <el-form-item label="详细地址:" prop="address"label-width="140px" style="width:403px;">
        <el-input v-model="formData.address" clearable style="width:250px;">
        </el-input>
      </el-form-item>
    </el-form>

    <el-form :inline="true" ref="elForm":model="formData":rules="rules1"label-width="140px"class="demo-form-inline">
      <el-form-item label="公司简称(中文):" prop="nameJc"label-width="140px" style="width:403px;">
        <el-input v-model="formData.nameJc"  clearable style="width:250px;">
        </el-input>
      </el-form-item>
      <el-form-item label="邮政编码:" prop="postId"label-width="140px" style="width:403px;">
        <el-input v-model="formData.postId"  clearable style="width:250px;">
        </el-input>
      </el-form-item>
    </el-form>

    <el-form :inline="true" ref="elForm":model="formData":rules="rules1"label-width="140px"class="demo-form-inline">
      <el-form-item label="公司首字母组合:" prop="nameF" label-width="140px" style="width:403px;">
        <el-input v-model="formData.nameF" clearable style="width:250px;">
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email" label-width="140px" style="width:403px;">
        <el-input v-model="formData.email" clearable style="width:250px;">
        </el-input>
      </el-form-item>
    </el-form>

    <el-form :inline="true" ref="elForm":model="formData":rules="rules1"label-width="140px"class="demo-form-inline">
      <el-form-item label="公司类型:" prop="types" label-width="140px" style="width:403px;">
        <el-select v-model="formData.types" clearable style="width:250px;">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单位网址链接:" prop="web" label-width="140px" style="width:403px;">
        <el-input v-model="formData.web" clearable style="width:250px;">
        </el-input>
      </el-form-item>
    </el-form>

    <div style="display: flex;">
      <div style="display: flex;">
        <el-form  ref="elForm":model="formData":rules="rules1"label-width="140px"class="demo-form-inline">
          <div style="height:37px;">
            <el-form-item label="企业类型:" prop="types" label-width="140px" style="width:403px;">
              <el-select v-model="formData.types" clearable style="width:250px;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>

        </el-form>
        <el-form :inline="true" ref="elForm":model="formData":rules="rules1"label-width="140px"class="demo-form-inline">
          <el-form-item label="公司简介:" prop="introductions" label-width="140px" style="width:403px;">
          <textarea :rows="6" v-model="formData.introductions" clearable class="texts"
                    style="
                      max-width:250px;
                      max-height:228px;
                      min-width:250px;
                      min-height:228px;">
          </textarea>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-form :inline="true" ref="elForm":model="formData":rules="rules1"label-width="140px"class="demo-form-inline">
      <el-form-item label="企业类型:" prop="types" label-width="140px" style="width:403px;">
        <el-select v-model="formData.types" clearable style="width:250px;">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司简介:" prop="introductions" label-width="140px" style="width:403px;">
        <textarea :rows="6" v-model="formData.introductions" clearable class="texts"
                  style="
                    max-width:250px;
                    max-height:228px;
                    min-width:250px;
                    min-height:228px;">
        </textarea>
      </el-form-item>
    </el-form>
    <el-form ref="elForm":model="formData":rules="rules1"label-width="140px"class="demo-form-inline">
      <el-form-item label="行业:" multiple prop="types" label-width="140px" style="width:403px;">
        <el-select v-model="formData.types" clearable style="width:250px;">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>


      <el-form-item label="时间选择" prop="field111">
        <el-time-picker v-model="formData.field111" format="HH:mm:ss" value-format="HH:mm:ss"
                        :picker-options='{"selectableRange":"00:00:00-23:59:59"}' :style="{width: '100%'}"
                        placeholder="请选择时间选择" clearable></el-time-picker>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
  </div>
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
        address:undefined,
        address1:undefined,
        address2:undefined,
        address3:undefined,
        postId: undefined,
        email:undefined,
        types:undefined,
        web:undefined,
        introductions:undefined,
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
        address: [{
          required: true,
          message: '请输入详细地址',
          trigger: 'blur'
        }],
        postId: [{
          required: true,
          message: '请输入邮政编码',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }],
        types: [{
          required: true,
          message: '请选择公司类型',
          trigger: 'blur'
        }],
        web: [{
          required: false,
          message: '请输入网址',
          trigger: 'blur'
        }],
        introductions:[{
          required: true,
          message: '请输入简介',
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
  width: 850px;
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
.texts{
  border-color: #d9d9d9;
  border-width: 1px;
}
</style>
