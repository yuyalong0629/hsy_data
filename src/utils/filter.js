import Vue from 'vue'

Vue.filter('light', function(value, keyword) {
  return value.replace(keyword, '123123')
})
