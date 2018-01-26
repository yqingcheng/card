// pages/minemp/minemp.js
var app = getApp()
import sum from '../../utils/sum'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    EnterpriseInfo:[],
    time_remaining: 0,
    listlength:'',
    Dlistlength:'0',
    length:'',
    open: false,
    id:'',
    link_origin:app.globalData.link_origin,
    showArr:[],
    referrer: undefined,
    referrerid: undefined,
    com:sum.com,
    usersatus:false,
    x1: 10,
    y1: 10,
    x2: 10,
    y2: 100  
  },
  kg: function (e) {
    console.log(e.changedTouches[0])
    var y = e.changedTouches[0].pageY
    if (y < 100) {
      this.setData({
        x1: 10,
        y1: 10,
        x2: 10,
        y2: 100
      })
    }
    else {
      this.setData({
        x2: 10,
        y2: 10,
        x1: 10,
        y1: 100
      })
    }
  },
  km: function (e) {
    console.log(e.changedTouches[0])
    var y = e.changedTouches[0].pageY
    if (y > 100) {
      this.setData({
        x1: 10,
        y1: 10,
        x2: 10,
        y2: 100
      })
    }
    else {
      this.setData({
        x2: 10,
        y2: 10,
        x1: 10,
        y1: 100
      })
    }
  },  
  // 个人
  // showitem: function (e) {
  //   var id = e.currentTarget.dataset.index,
  //     idx = e.currentTarget.dataset.idx,
  //     showArr = this.data.showArr
  //   showArr[idx] = !this.data.showArr[idx]
  //     this.setData({
  //       open:true,
  //       showArr: showArr
  //     })    
  // },
  // 公司
  gsshow: function (e) {
    var id = e.currentTarget.dataset.index,
      idx = e.currentTarget.dataset.idx,
      showArr1 = this.data.showArr1
    showArr1[idx] = !this.data.showArr1[idx]
    this.setData({
      open: true,
      showArr1: showArr1
    })
  },
  tapName: function (e) {
    var that = this,
      id = e.currentTarget.dataset.id
    this.setData({
      open: !this.data.open
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  ajax(cb){
    var that = this 
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        usersatus:true
      })
    })
    if(that.data.usersatus){
      wx.request({
        url: 'https://card.xiaoniren.cn/restapi/default/create',
        data: {
          openid: wx.getStorageSync('user').openid,
          // nickname: that.data.userInfo.nickName,
          // head_image: that.data.userInfo.avatarUrl,
          // gender: that.data.userInfo.gender,
          // country: that.data.userInfo.country,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          var time_remaining = res.data.data.time_remaining
          that.setData({
            time_remaining: time_remaining,
            referrer: res.data.data.referrer,
            referrerid: res.data.data.id,
            open: false,
          })
          cb && cb(res)
          // console.log(res.data.data.id)
        }
      })
    }
  },
  onLoad: function (options) {
    var that = this  
        wx.request({
          url: 'https://card.xiaoniren.cn/restapi/default/index',
          data: {
            openid: wx.getStorageSync('user').openid,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            var showArr=[],showArr1=[]
            var listlength = res.data.data.DeliveryInfo.length
            var Dlistlength = res.data.data.EnterpriseInfo.length
            var length = listlength + Dlistlength

            for (var i = 0; i < res.data.data.DeliveryInfo.length;i++){
              showArr.push(1)
            }
            for (var i = 0; i < res.data.data.EnterpriseInfo.length; i++) {
              showArr1.push(1)
            }
            that.setData({
              list: res.data.data.DeliveryInfo,
              listlength: listlength,
              EnterpriseInfo: res.data.data.EnterpriseInfo,
              Dlistlength: Dlistlength,
              length: length,
              showArr: showArr,
              showArr1:showArr1
            })
            
          }
        })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  make:function(){
    var that=this
    wx.showLoading({
      title: '跳转中..',
      icon: 'loading',
      mask: true,
    })
    console.log('天数是0没交钱',that.data.time_remaining)
    if (that.data.time_remaining > 0 && that.data.length < 3 ){
      wx.navigateTo({
        url: '../make/make',
      })
      wx.hideLoading()
    } else if (that.data.time_remaining <= 0){
      wx.navigateTo({
        url: '../index/index',
      })
      wx.hideLoading()
    } else if (that.data.length  == 3 ){
      wx.showToast({
        title: '限制作三张',
        icon: 'success',
        duration: 2000,
        mask: true,
      })
    }
  },
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.ajax(
      function(a){
      }
    );
    this.setData({
      open: false,
      showArr: [],
      showArr1:[]
    })  
     wx.request({
       url: 'https://card.xiaoniren.cn/restapi/default/index',
       data: {
         openid: wx.getStorageSync('user').openid,
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success: function (res) {
         var listlength = res.data.data.DeliveryInfo.length
         var Dlistlength = res.data.data.EnterpriseInfo.length
         var length = listlength + Dlistlength
       
         that.setData({
          
           list: res.data.data.DeliveryInfo,
           listlength: listlength,
           EnterpriseInfo: res.data.data.EnterpriseInfo,
           Dlistlength: Dlistlength,
           length: length
         })
         app.globalData.length = length
        
       }
     })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var taht=this
    open:false;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

 
  // 个人 delete
  delete:function(e){
    var that = this
    var id = e.currentTarget.dataset.index
    wx.showModal({
      title: '温馨提示',
      content: '确认删除',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: that.data.link_origin + '/restapi/delivery-info/delete?id=' + id,
            data: {
              // id: id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              var showArr = that.data.showArr
              showArr.forEach(function (value, index) {
                value = 0
              })
              that.setData({
                showArr: showArr
              })
              that.onLoad()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
    
  },
  // 个人 编辑
  amend: function (e) {
    var that = this
    var id = e.currentTarget.dataset.index
    console.log(id)
    wx.navigateTo({
      url: '../make/make?id=' + id + '&type=D',
    })
  },
  // 企业 delete
  qdelete: function (e) {
    var that = this
    var id = e.currentTarget.dataset.index
    wx.showModal({
      title: '温馨提示',
      content: '确认删除',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: that.data.link_origin + '/restapi/enterprise-info/delete?id=' + id,
            data: {
              // id: id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              var showArr1 = that.data.showArr1
              showArr1.forEach(function(value,index){
                value=0
              })
              that.setData({
                showArr1: showArr1
              })
              that.onLoad()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  // 企业 编辑
  qamend: function (e) {
    var that = this
    var id = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../make/make?id=' + id +'&type=E',
    })
  },
  
  //分享
  onShareAppMessage: function (res) {
    var that=this,id,Type,name,img
    if (res.from === 'button') {
      // 来自页面内转发按钮
      id = res.target.dataset.id
      Type = res.target.dataset.type
      name = res.target.dataset.name
      img = res.target.dataset.img
    }

    if(id && Type){
      return {
        imageUrl: img,
        title: name,
        path: '/pages/minempdetails/minempdetails?id=' + id + '&type=' + Type + '&referrer=' + that.data.referrerid,
        success: function (res) {
          // 转发成功
          console.log('/pages/minempdetails/minempdetails?id=' + id + '&type=' + Type + '&referrer=' + that.data.referrerid)
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }else{
      console.log(1)
      return {
        imageUrl: img,
        title: name,
        path: '/pages/index/index?&referrer=' + that.data.referrerid,
        success: function (res) {
          // 转发成功
          console.log('/pages/index/index?&referrer=' + that.data.referrerid)
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
  },
  
  // 点击跳转首页
  poster(){
    sum.com=1
    this.setData({
      com:sum.com 
    })
    console.log(this.data.com)
    wx.navigateTo({
      url: '../index/index',
     
    })
  }
})