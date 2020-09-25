import {debounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener : null
    }
  },
  mounted () {
    let refersh = debounce(
      this.$refs.scroll && this.$refs.scroll.refresh,
      500
    );
    this.$bus.$on('itemImgLoad', () => {
      refersh();
    });
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  },
}
