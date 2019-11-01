<template>
  <div class="classroom">
    <ul class="classroom-left">
      <li
        class="classroom-left-list"
        v-for="item of classroom"
        :key="item.index"
        :class="{ activeClassroom: isActiveClassroom === item.index }"
        @click="handleClassroom(item.index)"
      >
        <span>{{ item.text }}</span>
        <a-icon :type="item.icon" />
      </li>
    </ul>
    <div class="classroom-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Classroom',
  data() {
    return {
      classroom: [
        { index: 0, icon: 'right', text: '互联网广告知识' },
        { index: 1, icon: 'right', text: '短视频广告投放' },
        { index: 2, icon: 'right', text: 'B站广告投放' }
      ],
      isActiveClassroom: 0
    }
  },
  mounted() {
    if (this.$route.query.type) {
      this.isActiveClassroom = +this.$route.query.type - 1
    }
  },
  methods: {
    handleClassroom(index) {
      this.isActiveClassroom = index
      this.$router.push({ path: '/mine/list', query: { type: index + 1 } })
    }
  }
}
</script>

<style lang="less" scoped>
.classroom {
  height: 100%;
  display: flex;
  .classroom-left {
    flex: 0 0 210px;
    border: 1px solid #ececec;
    height: 152px;
    .classroom-left-list {
      border-bottom: 1px solid #ececec;
      height: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        margin-right: 18px;
        width: 108px;
      }
      &:last-child {
        border-bottom: none;
      }
    }
    .activeClassroom {
      color: #d92b30;
    }
  }

  .classroom-right {
    flex: 1;
    margin-left: 24px;
    min-height: 500px;
  }
}
</style>
