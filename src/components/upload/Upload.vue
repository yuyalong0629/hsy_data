<template>
  <div class="upload">
    <a-upload
      action="http://upload.hsydata.com/upload.htm"
      listType="picture-card"
      :fileList="fileList"
      :data="{'app':'userImages', 'type': 'json'}"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">上传头像</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      count: 0,
      propsFileList: undefined
    }
  },
  props: {
    userImage: {
      type: String,
      required: false,
      default: function() {
        return ''
      }
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
      this.count++
      this.propsFileList = undefined
      this.fileList.forEach(item => {
        console.log(item)
        if (item.response && item.response.resultCode === 0) {
          this.propsFileList = item.response.httpUrl
          this.$emit('propsFileList', this.propsFileList)
        }
      })
    }
  },
  watch: {
    userImage: {
      handler(val) {
        if (val) {
          this.fileList = []
          this.fileList.push({
            url: val,
            uid: Math.floor(Math.random() * 100),
            name: 'avator.png'
          })
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.upload {
  /deep/ .ant-upload-list-picture-card .ant-upload-list-item {
    border-radius: 50%;
    width: 86px;
    height: 86px;
    margin: 0px;
    .ant-upload-list-item-info {
      border-radius: 50%;
      span {
        height: 100%;
      }
    }
  }
  /deep/ .ant-upload.ant-upload-select-picture-card {
    border-radius: 50%;
    height: 86px;
    width: 86px;
  }
}
</style>
