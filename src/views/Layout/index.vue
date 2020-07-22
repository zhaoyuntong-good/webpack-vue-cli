<template>
  <div class="layout">
    <div class="top-bar"></div>
    <div class="slider-bar">
      <slider-bar :menuData="asyncRoutes"></slider-bar>
    </div>
    <router-view class="pages-box"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import SliderBar from '@/components/SliderBar'
  export default {
    name: 'Layout',
    components: {
      SliderBar
    },
    data(){
    	return {}
    },
    computed: {
      ...mapState(['asyncRoutes'])
    },
    created(){
    },
    methods: {
      
    }
  }
</script>

<style scoped>
  .layout {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .top-bar {
    width: 100vw;
    height: 40px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 0;
    background-color: #2a5b96;
  }
  .slider-bar {
    width: 200px;
    height: calc(100vh - 40px);
    position: fixed;
    left: 0;
    top: 40px;
    z-index: 0;
    background-color: #fff;
  }
  .pages-box {
    width: calc(100% - 200px);
    height: calc(100% - 40px);
    margin-top: 40px;
    margin-left: 200px;
  }
</style>
