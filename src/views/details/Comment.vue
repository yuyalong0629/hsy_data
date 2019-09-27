<template>
  <div class="comment">
    <a-list
      class="comment-list"
      :header="false"
      itemLayout="horizontal"
      :dataSource="comments.data"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-comment :author="item.pt">
          <p
            slot="content"
            v-html="comments.keyword ? light(item.ct, comments.keyword) : item.ct"
          >{{item.ct}}</p>
          <p class="comment-num">
            <span style="margin-right: 12px">
              <a-icon type="like-o" />
              {{item.cn}}
            </span>
            <span style="margin-right: 12px;">
              <a-icon type="message" />
              {{item.pn}}
            </span>
          </p>
        </a-comment>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { light } from 'utils/util'

export default {
  name: 'comment',
  data() {
    return {}
  },
  props: {
    comment: {
      type: Object,
      required: false,
      dafault: function() {
        return {}
      }
    }
  },
  methods: {
    light
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
  width: 100%;
  .ant-comment {
    width: 100%;
  }
  .ant-comment-inner {
    padding: 0;
  }
  .comment-num {
    margin-top: 12px;
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
