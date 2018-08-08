// pages/detail/detail.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '',
    content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      index: options.index
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    //获取data
    var index = this.data.index
    
    this.setData({
      content: wx.getStorageSync('items')[index]
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

  //删除当前
  delete: function(){
    var self = this
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '确定',
      confirmColor: '',
      success: function(res) {
        if (res.confirm) {
          //删除当前
          var items = wx.getStorageSync('items')
          var index = self.data.index
          
          items.splice(index, 1)
          wx.setStorageSync('items', items)

          wx.showModal({
            title: '',
            content: '删除成功',
            showCancel: false,
            confirmText: '确定',
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../index/index'
                })
              }
            }
            
          })
          
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '请重试',
          icon: 'none',
          duration: 2000
        })
      },
      complete: function(res) {},
    })
  },

  // 画布
  canvasFun: function(){
    const wxGetImageInfo = wx.getImageInfo
    const ctx = wx.createCanvasContext('shareCanvas')
    // 底图
    //ctx.drawImage(res.path, 0, 0, 600, 900)
    // 作者名称
    //填充背景色
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 300, 300)
    ctx.setTextAlign('center')    // 文字居中
    ctx.setFillStyle('#000000')  // 文字颜色：黑色
    ctx.setFontSize(22)         // 文字字号：22px
    ctx.fillText("作者：一斤代码", 300 / 2, 150)
    ctx.stroke()
    ctx.draw()
  }

})