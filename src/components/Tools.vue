<template>
  <div v-if="$route.name == 'tools' || $route.name == 'links'">
    <el-divider content-position="center" class="my-2"
      ><span><h3>自建工具</h3></span></el-divider
    >
    <div class="link-post text-left">
      <el-row :gutter="0" class="mt-6 mb-2">
        <el-col :span="12" :md="8">
          <div class="tool-box shadow-box m-1 p-2 mb-2" @click="methods.goTool('douyin')">
            <div class="flex">
              <svg-icon
                class="transform"
                width="3rem"
                height="3rem"
                file-name="douyin"
              ></svg-icon>
              <h4 class="text-left h-1x pl-1">抖音解析</h4>
            </div>
            <p class="h-2x text-left pt-1">解析抖音无水印视频</p>
          </div>
        </el-col>

        <el-col :span="12" :md="8">
          <div class="tool-box shadow-box m-1 p-2 mb-2" @click="methods.goTool('avatar')">
            <div class="flex">
              <svg-icon
                class="transform"
                width="3rem"
                height="3rem"
                file-name="avatars"
              ></svg-icon>
              <h4 class="text-left h-1x pl-1">头像生成器</h4>
            </div>
            <p class="h-2x text-left pt-1">生成各类头像</p>
          </div>
        </el-col>

        <el-col :span="12" :md="8">
          <div class="tool-box shadow-box m-1 p-2 mb-2" @click="methods.goTool('hotsearch')">
            <div class="flex">
              <svg-icon
                class="transform"
                width="3rem"
                height="3rem"
                file-name="hot"
              ></svg-icon>
              <h4 class="text-left h-1x pl-1">百度热搜</h4>
            </div>
            <p class="h-2x text-left pt-1">实时热点数据</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <div v-if="$route.name != 'tools'">
    <RouteView />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import SvgIcon from "@/components/tool/SvgIcon.vue";
import { useRouter } from "vue-router";
import RouteView from "@/components/module/RouteView";
export default {
  components: { SvgIcon, RouteView },
  setup() {
    const router = useRouter();
    const state = reactive({});
    const methods = {
      goTool(name) {
        router.push({ name });
      },
    };
    return {
      ...toRefs(state),
      methods,
    };
  },
};
</script>

<style lang="less" scoped>
.tool-box {
  cursor: pointer;
  z-index: 1;
  .avatar {
    height: 3.6rem;
    width: 3.6rem;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(1.4rem, -1.2rem);
    border-radius: 16px;
    border: 1px solid var(--border-color);
    overflow: hidden;
  }
  h4 {
    font-size: 1.1rem;
    color: var(--card-title-color);
  }
  p {
    color: var(--text-color);
    line-height: 1.5rem;
    height: 3rem;
  }
}
.tool-box:hover img,
.tool-box:hover svg {
  transform: scale(1.08);
}
.tool-box:hover h4 {
  color: var(--theme-color);
}
.flex {
  align-items: center;
}
</style>
