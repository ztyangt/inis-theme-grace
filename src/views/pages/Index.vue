<template>
  <div class="indexcard">
    <div class="layout-169 text-center mt-2">

      <el-skeleton class="banner cover" :loading="topSkeleton" animated>
        <template #template>
          <el-skeleton-item variant="image" class="wh-100" />
        </template>
      </el-skeleton>

      <el-carousel v-if="!topSkeleton" :interval="5000" indicator-position="none">
        <el-carousel-item v-for="(item, index) in TopList" :key="index">
          <div
            class="banner cursor-pointer"
            @click="methods.goArticle(item.expand.sort[0].name, item.id)"
          >
            <div
              class="wh-100 cover"
              :style="{
                'background-image':
                  'url(' + (item.img_src ? item.img_src : randomImg) + ')',
              }"
            ></div>
            <div class="text-left banner-title p-1">
              <span class="p-1">{{ item.title }}</span>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
  <Music v-if="music"/>
  <div class="indexcard pt-2">
    <el-skeleton class="pt-2" :rows="10" :loading="aboutSkeleton" animated/>    
    <div v-if="!aboutSkeleton" class="about article-content" v-html="About" @click="methods.clickEvent"></div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { GET } from "@/utils/http/request";
import { useRouter } from "vue-router";
import Music from "@/components/module/Music";
import { inisHelper } from "@/utils/helper";
export default {
  components: {
    Music,
  },

  setup() {
    const router = useRouter();
    // const grace_config = inisHelper.get.storage("grace_config")
    const grace_config = inisHelper.get.sessionStorage("grace_config")
    const state = reactive({
      randomImg: INIS.api + '/file/random?id=' + Math.random().toString(36).substr(2),
      music: (grace_config ? grace_config.option.music : false),
      TopList: [],
      topSkeleton: true,
      aboutSkeleton: true,
      About: "",
    });
    const methods = {
      initData() {
        methods.getArticle();
        methods.getAbout();
      },
      getArticle() {
        if (state.TopList.length == 0) {
          let params = { where: "is_top=1;is_show=1;", limit: 10, cache: false };
          GET("article/sql", { params }).then((res) => {
            if (res.data.code == 200) {
              state.TopList = res.data.data.data;
              state.topSkeleton = false;
            }
          });
        }
      },

      getAbout() {
        if (state.About == "") {
          let params = { alias: "about" };
          GET("page", { params }).then((res) => {
            if (res.data.code == 200) {
              state.About = res.data.data.content;
              state.aboutSkeleton = false;
            }
          });
        }
      },
      goArticle(sort_name, id) {
        let route = "article";
        if (sort_name == "日记") route = "diary";
        else if (sort_name == "相册") route = "album";
        router.push({
          name: route,
          params: { id },
        });
      },
      addClass(element,csName){
        if(!methods.hasClass(element,csName)){ element.className+=' '+csName; }
      },
      hasClass(element,csName){ return 　element.className.match(RegExp('(\\s|^)'+csName+'(\\s|$)'));  },
      clickEvent(e) {
        if (e.target.nodeName == "IMG" && e.target.className != "emoji-img") {
          state.imgList.forEach((item, index) => {
            if (e.target.src.indexOf(item) !== -1) {
              state.initialIndex = index;
            }
          });
          state.imgVisible = true;
        }else if (e.target.nodeName == "LI" && e.target.className == "nav-item"){
          var list = e.target.parentNode.querySelectorAll('li')
          list.forEach((item) => {
            item.children[0].classList.remove("active")
          })
          e.target.children[0].classList.add("active");
          var tab = e.target.children[0].href.split("#")[1]
          if(tab){
            var tabdom = document.getElementById(tab)
            tabdom.parentNode.childNodes.forEach((item) => {
              if(item.nodeName == "DIV"){
                item.setAttribute("class","tab-pane")
              }
            })
            if (tabdom.classList.value.indexOf("show active") == -1) {
              methods.addClass(tabdom, "show active");
            }
          }
        }
      },
    };

    onMounted(() => {
      methods.initData();
    });
    return { ...toRefs(state), methods };
  },
};
</script>

<style lang="less" scoped>
.indexcard {
  margin-bottom: 1.5rem;
  text-align: left;
}
.about {
  padding-top: 0;
}
.item-title {
  color: var(--h1-color);
}

.layout-169:after {
  padding-top: 56.25%;
  content: "";
  display: block;
}
.layout-169 {
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  max-height: 280px;
}
.el-carousel,
.banner {
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 0;
}
:deep(.el-carousel__container) {
  height: 100%;
}
.cover {
  border-radius: var(--border-radius);
  background-repeat: no-repeat;
  background-position: 50% 50%;
  display: block;
  background-size: cover;
  overflow: hidden;
  background-color: rgba(120, 120, 120, 0.1);
}
.banner-title {
  position: absolute;
  bottom: .5rem;
  left: 0;
  font-weight: 600;
  color: #fff;
  z-index: 99;
  font-size: 1.2rem;
  span {
    background-color: var(--theme-color-3);
    border-radius: var(--border-radius);
  }
}
</style>
