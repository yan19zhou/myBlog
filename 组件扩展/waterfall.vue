<!--
 * @Description:瀑布式布局
 * @Author: zhouy
 * @Date: 2021-11-17 12:00:44
 * @LastEditTime: 2021-11-17 17:54:57
 * @LastEditors: zhouy
-->
<template>
  <div class="warp">
    <div id="waterfall"></div>
    <p id="msg">正在加载中...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 230,
      gap: 16,
      loaded: 0,
      cols: 0,
      params: {
        pageNo: 1,
        pageSize: 20,
      },
      total: 0,
      heights: [],
      isReq: false,
      imgsArr: [
        {
          src: "https://gimg2.baid=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180211%2F00%2F1518279736-ImsfeASJcb.jpg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=401c068f0a25ed2a42a4b070c6ee6a96",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20190210%2F8534c3170a314d83b104d04aa120a040.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=d15af814c4ae34b95bc60e35efc88e4c",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.desktx.com%2Fd%2Ffile%2Fwallpaper%2Fanimals%2F20160822%2F05128add3de7bc5acfa3a38612673e1d.jpg&refer=http%3A%2F%2Fwww.desktx.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=667c221c38da5abdb0ed7d34d87ef564",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.yidianzhidao.com%2FUploadFiles%2Fimg_1_1195934273_1809290298_26.jpg&refer=http%3A%2F%2Fwww.yidianzhidao.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=220f9c21856a2bb0cc71f76ba0b5e2cc",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201508%2F10%2F20150810150356_hnves.thumb.400_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=0971bf1e69ad8e180fb704140d7a29b0",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },

        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180211%2F01%2F1518282902-iSBdILoxsY.jpg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=c4c6cd3890f420680e5db7f92a8d543c",

          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190504%2F20%2F1556972126-MAGsvFyfEd.png&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=4ecd99f7107e39197378a2b7a04176c6",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile06.16sucai.com%2F2016%2F0506%2Ff43b5bab036349f7b4ffdef661da97a8.jpg&refer=http%3A%2F%2Ffile06.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=fd805292f3f72e9d7ba51fc9f45245ea",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2F3%2F5a%2Ffe101126073_250_350.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=72446335a210920f58bf6c6e6a106abe",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbos.pgzs.com%2Frbpiczy%2FWallpaper%2F2015%2F1%2F22%2Fe975967d962e45a7af2863060371d81c-12.jpg&refer=http%3A%2F%2Fbos.pgzs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=775ff5be8b8b1e9abc8848ff575e437d",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2017-11%2F2017110816281636782.jpg&refer=http%3A%2F%2Fpic.qqtn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440862&t=36bd6acad4963ad2d153b3a4e220a363",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190624%2F14%2F1561358677-yVQerfxNJO.jpeg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440862&t=25e73d0d95ee43d9b160bd0dfe24aa38",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180211%2F01%2F1518282942-vBSpHErLKP.jpg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440862&t=809ae8cf1c654bb83dbbab9437b8e276",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.ivsky.com%2Fimg%2Ftupian%2Fpre%2F201611%2F09%2Fsugelan_zheer_mao-002.jpg&refer=http%3A%2F%2Fimg.ivsky.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440862&t=962fa67d0f3fff40553440ccb8b06ec4",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw640h399%2F20180301%2F9ce9-fwnpcns9232331.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638441157&t=46c567a84e0172aa430f0d058ba9a92f",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw640h640%2F20180109%2F9e54-fyqnici8428669.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638441197&t=70f9aec9253df0dcea506df28938327a",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },

        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.euro-premium.cn%2Fsites%2Fdefault%2Ffiles%2F2017%2F12%2F2017-12-18-609.jpg&refer=http%3A%2F%2Fwww.euro-premium.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638441197&t=e67e19c5e29ebd66265d2ed779359002",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-2816258155-A3E56E8F829BF213072E703F23FC3DC1%2F0%3Ffmt%3Djpg%26size%3D21%26h%3D550%26w%3D410%26ppv%3D1.jpg&refer=http%3A%2F%2Fqqpublic.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638441314&t=def05d46f7dee911d2a2a8bb306976d5",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.euro-premium.cn%2Fsites%2Fdefault%2Ffiles%2F2017%2F09%2F2017-09-30-110.jpg&refer=http%3A%2F%2Fwww.euro-premium.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638441314&t=d4d758316d5f48f3800b59a2eec7dc46",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.goupuzi.com%2Fnewatt%2FMon_2004%2F1_183281_b959196b41fb01e.jpg&refer=http%3A%2F%2Fwww.goupuzi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638441314&t=663a187a9631164c450e2b3b3e1b8d92",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
      ],
    };
  },
  mounted() {
    this.init();

    window.addEventListener("scroll", this.lazyLoad);

    window.addEventListener("resize", this.debounce(this.resize, 50));
  },
  methods: {
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomHeight() {
      return this.getRandomInt(200, 500) + "px";
    },
    getRandomColor() {
      return "rgba(" + this.getRandomInt(0, 255) + ", " + this.getRandomInt(0, 255) + ", " + this.getRandomInt(0, 255) + ", " + this.getRandomInt(1, 10) / 10 + ")";
    },
    createItem() {
      var div = document.createElement("div");

      // var img = document.createElement('img')
      // img.src = src
      // div.appendChild(img)

      div.className = "item";
      div.style.position = "absolute";
      div.style.borderRadius = "10px";
      div.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
      div.style.background = this.getRandomColor();
      div.style.height = this.getRandomHeight();
      div.style.width = this.width + "px";
      return div;
    },
    request() {
      return new Promise(function (resolve) {
        resolve(this.imgsArr);
      });
    },
    debounce(fn, delay) {
      delay = delay || 100;
      var timer = null;

      return function () {
        var args = Array.prototype.slice.apply(arguments);

        if (timer) {
          clearTimeout(timer);
          timer = null;
        }

        timer = setTimeout(function () {
          fn.apply(this, args);
        }, delay);
      };
    },
    getCols() {
      // n * width + (n - 1) * gap <= bodyWidth - margin * 2
      return ~~((document.body.offsetWidth - 32 + this.gap) / (this.width + this.gap));
    },
    getMinIndex(array) {
      var min = Math.min.apply(null, array);

      return array.indexOf(min);
    },
    setWaterFallRect() {
      var wf = document.querySelector("#waterfall");
      var max = Math.max.apply(null, this.heights);

      wf.style.height = max + "px";
      wf.style.width = this.width * this.cols + (this.cols - 1) * this.gap + "px";
    },
    waterfall() {
      this.cols = this.getCols();
      var items = document.querySelectorAll("#waterfall .item");
      for (var i = this.loaded; i < items.length; i++) {
        var item = items[i];
        var height = item.offsetHeight;

        if (i < this.cols) {
          item.style.top = 0;
          item.style.left = i * (this.width + this.gap) + "px";
          this.heights.push(height);
        } else {
          var minIndex = this.getMinIndex(this.heights);
          var top = this.heights[minIndex] + this.gap;

          item.style.top = top + "px";
          item.style.left = minIndex * (this.width + this.gap) + "px";
          this.heights[minIndex] = top + height;
        }

        this.loaded++;
      }

      this.setWaterFallRect();
    },
    init() {
      if (this.isReq) return;
      this.isReq = true;
      const res = {
        lists: this.imgsArr,
        total: this.imgsArr.length,
      };
      var lists = res.lists;
      var frag = document.createDocumentFragment();

      this.total = res.total;
      this.isReq = false;
      this.params.pageNo++;

      for (var i = 0; i < lists.length; i++) {
        frag.appendChild(this.createItem(lists[i]));
      }

      document.querySelector("#waterfall").appendChild(frag);
      this.waterfall();
    },
    lazyLoad() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var documentHeight = document.documentElement.scrollHeight;
      var clientHeight = window.innerHeight;

      // documentHeight - scrollTop - clientHeight < 0.5 * clientHeight
      if (documentHeight - scrollTop < 1.5 * clientHeight) {
        if (this.loaded >= this.total) {
          document.querySelector("#msg").innerText = "没有更多了";
          window.removeEventListener("scroll", this.lazyLoad);
          return;
        }

        this.init();
      }
    },
    resize() {
      if (document.body.offsetWidth < 600) return;

      this.loaded = 0;
      this.heights = [];
      this.waterfall();
    },
  },
};
</script>
<style scoped>
#waterfall {
  margin: 16px auto;
  position: relative;
}

.item {
  width: 230px;
  border-radius: 10px;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

#msg {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 0;
  height: 80px;
  line-height: 80px;
  color: #3d3d3d;
}
</style>
