<template>
  <div class="comment">
    <a-list class="comment-list" :header="false" itemLayout="horizontal" :dataSource="comments">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-comment :author="item.pt">
          <p slot="content">{{item.ct}}</p>
        </a-comment>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  name: 'comment',
  data() {
    return {}
  },
  props: {
    comment: {
      type: Array,
      required: false,
      dafault: function() {
        return []
      }
    }
  },
  computed: {
    comments() {
      return this.comment
    }
  }
}
</script>

<style lang="less" scope>
.comment {
  .ant-comment-inner {
    padding: 0;
  }
}
</style>
