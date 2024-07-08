"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activeTab: "follow",
      followPosts: [
        { image: "/static/follow1.jpg", text: "这是关注内容1" },
        { image: "/static/follow2.jpg", text: "这是关注内容2" }
      ],
      circlePosts: [
        { image: "/static/circle1.jpg", text: "这是宠物圈内容1" },
        { image: "/static/circle2.jpg", text: "这是宠物圈内容2" }
      ]
    };
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.activeTab === "follow" ? 1 : "",
    b: common_vendor.o(($event) => $options.switchTab("follow")),
    c: $data.activeTab === "circle" ? 1 : "",
    d: common_vendor.o(($event) => $options.switchTab("circle")),
    e: $data.activeTab === "follow"
  }, $data.activeTab === "follow" ? {
    f: common_vendor.f($data.followPosts, (post, index, i0) => {
      return {
        a: post.image,
        b: common_vendor.t(post.text),
        c: index
      };
    })
  } : {}, {
    g: $data.activeTab === "circle"
  }, $data.activeTab === "circle" ? {
    h: common_vendor.f($data.circlePosts, (post, index, i0) => {
      return {
        a: post.image,
        b: common_vendor.t(post.text),
        c: index
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Think/Desktop/learning/uniapp-superpet/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
