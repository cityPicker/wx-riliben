//index.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    items: [],
    today: new Date().toLocaleDateString(),
        
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    //获取itmes
    this.setData({
      items: wx.getStorageSync('items') || []
    })
  },
  onLoad: function () {
    
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    //console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //查看大图
  viewImg: function (e) {
    var current = e.currentTarget.dataset.tap
    var url = e.currentTarget.dataset.url
    
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: url // 需要预览的图片http链接列表
    })
  },

  //为空时点击跳转添加
  goAdd: function(){
    wx.switchTab({
      url: '../add/add'
    })
  },

  //去详情页
  toDetail: function(e){
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../detail/detail?index='+index
    })

  },

  // 触底事件
  onReachBottom: function(){
    setTimeout(() => {
      this.setData({
        isHideLoadMore:true
      })
    }, 1000)
  }
})
