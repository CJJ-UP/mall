import { debounce } from "./utils"
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      //用于保存事件处理函数
      itemImgListener: null,
      refresh: null
    }
  },

  mounted() {
    //图片加载时重新计算滚动高度 并进行防抖处理
    this.refresh = debounce(this.$refs.scroll.refresh, 100)
    //将事件处理函数抽离出来保存 便于取消监听时使用
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener)
  },
}

export const BackTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    backTop(position) {
      this.isShowBackTop = -position.y > 1000;
    }
  },
}