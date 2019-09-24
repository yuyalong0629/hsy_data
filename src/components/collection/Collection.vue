<template>
  <div class="collection">
    <!--  -->
    <div class="collection-add">
      <span @click="onClickCollection">
        <a-icon type="plus-circle" />新建分组
      </span>
    </div>
    <!-- 新建分组 -->
    <a-modal
      title="新建后直接添加到新分组里"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item label="分组名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input v-decorator="[
          'themeName']" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-list :loading="loading" itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="false" @click="addCollect(item.id)">
          <a slot="title" href="javascript:;">{{item.themeName}}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { collectGroupList, addCollectGroup, addCollect } from 'api/collection'

export default {
  name: 'Collection',
  data() {
    return {
      loading: false,
      data: [],
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      inputValue: ''
    }
  },
  props: {
    kolId: {
      type: Number,
      default: undefined
    }
  },
  mounted() {
    this.collectGroupList()
  },
  methods: {
    // 初始化收藏数据
    collectGroupList() {
      this.loading = true
      return collectGroupList()
        .then(res => {
          if (res.code === 200) {
            this.data = res.userThemeInfos
            this.loading = false
          } else {
            this.loading = false
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error(err)
        })
    },
    onClickCollection() {
      this.visible = true
    },
    // 添加收藏
    handleOk(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          // 添加分组
          this.confirmLoading = true
          addCollectGroup({ ...values })
            .then(res => {
              console.log(res)
              if (res.code === 200) {
                setTimeout(() => {
                  this.$message.success(res.message)
                  this.visible = false
                  this.confirmLoading = false
                  this.collectGroupList()
                }, 1000)
              } else {
                this.$message.error(res.message)
                this.confirmLoading = false
              }
            })
            .catch(err => {
              this.confirmLoading = false
              this.$message.error(err)
            })
        }
      })
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    // 添加收藏
    addCollect(id) {
      console.log(id)
      addCollect({
        kolId: this.kolId || this.$route.query.kolId,
        themeId: id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scope>
.collection {
  height: 500px;
  overflow: auto;
  .collection-add {
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    text-align: center;
    i {
      margin: 0 4px;
    }
  }
}
</style>
