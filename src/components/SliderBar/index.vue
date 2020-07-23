<template>
  <div class="slider-bar">
    <el-menu
      :default-active="tebActive"
      @select="menuSelect">
      <span v-for="item in menuData" :key="item.path">
        <el-submenu v-if="item.children.length > 1" :index="item.path">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <el-menu-item 
            v-for="childItem in item.children" 
            :key="childItem.path" 
            :index="item.path + '/' + childItem.path">
            {{childItem.meta.title}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.path">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
      </span>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'SliderBar',
    props: {
      menuData: {
        type: Array,
        require: true,
        default: [],
      }
    },
    data(){
    	return {
        tebActive: null,
      }
    },
    created(){
      this.tebActive = this.$route.fullPath;
    },
    methods: {
      menuSelect (index, indexPath) {
        this.$router.push({
          path: index
        })
      }
    }
  }
</script>

<style scoped>
</style>
