//addTag.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagList: [  //标签列表
      
    ],
    tagvalue: '', //input内容
    ishidden: true,  //确定按钮是否显示
  },

  onLoad: function () {
    //标签集
    this.setData({
      tagList: wx.getStorageSync('tags') || []
    })
  },

  //点击标签
  selectTag: function(event){
    var curTag = 'tagList[' +event.currentTarget.dataset.index+'].isSelected'
    this.setData({
      [curTag]: !event.currentTarget.dataset.tab
    })
  },

  //标签输入
  inputValue: function(event){
    this.setData({
      tagvalue: event.detail.value.trim()
    })
    if (this.data.tagvalue) {
      this.setData({ ishidden: false })
    }else{
      this.setData({ ishidden: true })
    }
  },
  //添加标签确认
  addSubmit: function(){
    var tagvalue = this.data.tagvalue;
    this.data.tagList.push({
      name: tagvalue,
      isSelected: true
    })
    this.setData({
      tagList: this.data.tagList,
      tagvalue: '',
      ishidden: true
    })
  },
  
  //保存标签
  addTag: function(){
    var tags = this.data.tagList || []
    tags.concat(tags)
    wx.setStorageSync('tags', tags)

    wx.navigateBack()
  },

  //取消返回上一页
  goBack: function(){
    wx.navigateBack()
  }
  
})