//add.js
const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    context: '',
    mylocation:'',
    myTags: [],
    uploadImgs: [],
  },

  onLoad: function () {
    
  },

  onShow: function () {
    //标签
    this.setData({
      myTags: wx.getStorageSync('tags') || []
    })
    //console.log("uploadImgs: "+this.data.uploadImgs)
  },

  //textarea输入
  context: function(e){
    this.setData({
      context: e.detail.value
    })
  },

  //添加图片
  uploadImgs: function(){
    var self = this
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        
        self.data.uploadImgs = self.data.uploadImgs.concat(tempFilePaths)
        self.setData({
          uploadImgs: self.data.uploadImgs,
        })
        //console.log("self.data.uploadImgs"+self.data.uploadImgs)
      }
    })
  },

  //删除图片
  deleteImg: function(e){
    var index = e.currentTarget.dataset.index
    this.data.uploadImgs.splice(index, 1)
    
    this.setData({
      uploadImgs: this.data.uploadImgs
    })
  },

  //查看大图
  viewImg: function(e){
    var current = e.currentTarget.dataset.tap
    var urls = this.data.uploadImgs
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  //获取位置
  mylocation: function(){
    var self = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.chooseLocation({
          success: function(res){
            self.setData({
              mylocation: res.name
            })
          }
        })
      }
    })
  },
  
  //添加标签
  addTags: function(){
    wx.navigateTo({
      url: '../addTag/addTag'
    })
  },

  //发布
  formSubmit: function(){
    var context = this.data.context,
    mylocation = this.data.mylocation,
    myTags = this.data.myTags,
    uploadImgs = this.data.uploadImgs
    //console.log("uploadImgs: "+uploadImgs)
    //return false

    if (!context && uploadImgs.length==0){
      wx.showModal({
        title: '提示',
        content: '请填写内容',
      })
      return false
    }

    var itemCon = {
      context: context,
      mylocation: mylocation,
      myTags: myTags,
      uploadImgs: uploadImgs,
    }
    
    
    var dateId = Date.now()
    var dateView = util.formatTime(new Date(dateId))
    var item = {
      itemCon: itemCon,
      dateId: dateId,
      dateView: dateView
    }
    app.globalData.items.unshift(item)
    

    //存缓存
    var items = app.globalData.items || []
    //console.log(items)
    items.concat(item)
    //console.log(items)
    wx.setStorageSync('items', items)
    //console.log(items)
    // wx.switchTab({
    //   url: '../index/index'
    // })


    //console.log(this.data.uploadImgs)
    var imgs = this.data.uploadImgs || []
    console.log(imgs)
    ( wx.getStorageSync('imgs')||[]).push(imgs)
    console.log(imgs)
    wx.setStorageSync('imgs', imgs)
  },
})