import Notify from '../../@vant/weapp/notify/notify';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    text:'风格简介',
    list: [
      {num:1,name:'拾穗者',proUrl:'../../images/des_glaneuses.jpg', choose:false, generate:false},
      {num:2,name:'画家与模特',proUrl:'../../images/la_muse.jpg', choose:false, generate:false},
      {num:3,name:'镜前的少女',proUrl: '../../images/mirror.jpg', choose:false, generate:false},
      {num:4,name:'星月夜',proUrl:'../../images/starry_night.jpg',choose:false, generate:false}, 
      {num:5,name:'Udnie',proUrl:'../../images/udnie.jpg',choose:false, generate:false},
      {num:6,name:'神奈川冲浪里',proUrl:'../../images/wave_crop.jpg',choose:false, generate:false},
      {num:7,name:'SDUWH',proUrl:'../../images/sduwh.jpg',choose:false, generate:false}
    ],
    current: 0,
    animationData: {},
    animationData2: {},
    changeStyle: false,
    choose: false,
    show: false,
    showShare: false,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: 'QQ', icon: 'qq' },
      { name: '保存图片', icon: '/images/img1.png' },
      { name: '分享海报', icon: 'poster' },
    ],
    modellist: ['des_glaneuses', 'la_muse', 'mirror', 'starry_night', 'udnie', 'wave_crop', 'sduwh']
  },

  onLoad: function (options) {
    this.stretch(370)
    this.shrink(350)
  },
  
  change(e){
    this.setData({
      current: e.detail.current
    })
    this.stretch(370)
    this.shrink(350)
  },

  // 收缩
  stretch(h){
    var animation = wx.createAnimation({
      duration: 250,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.height(h).step()
    this.setData({
      animationData: animation.export(),
    })
  },

  // 展开
  shrink(h){
    var animation2 = wx.createAnimation({
      duration: 250,
      timingFunction: 'ease',
    })
    this.animation2 = animation2
    animation2.height(h).step()
    this.setData({
      animationData2: animation2.export()
    })
  },

  goToDescription1(){
    wx.navigateTo({
      url: '../introduce/pic1/pic1',
    })
  },

  goToDescription2(){
    wx.navigateTo({
      url: '../introduce/pic2/pic2',
    })
  },

  goToDescription3(){
    wx.navigateTo({
      url: '../introduce/pic3/pic3',
    })
  },

  goToDescription4(){
    wx.navigateTo({
      url: '../introduce/pic4/pic4',
    })
  },

  goToDescription5(){
    wx.navigateTo({
      url: '../introduce/pic5/pic5',
    })
  },

  goToDescription6(){
    wx.navigateTo({
      url: '../introduce/pic6/pic6',
    })
  },

  goToDescription7(){
    wx.navigateTo({
      url: '../pic7/pic7',
    })
  },

  chooseimg: function() {
    var _this = this
    wx.chooseImage({
      success (res) {
        var temp1 = 'list[' + _this.data.current + '].proUrl'
        var temp2 = 'list[' + _this.data.current + '].tempimg'
        var temp3 = 'list[' + _this.data.current + '].choose'
        _this.setData({
          [temp1]: res.tempFilePaths[0],
          [temp2]: res.tempFilePaths[0],
          [temp3]: true,
          
        })
        console.log(res.tempFilePaths[0]),
        Notify({
          type: 'success',
          message: '选择成功',
          duration: 1000,
        });
      }
    })
  },

  generate: function() {
    var _this = this
    if(this.data.list[_this.data.current].choose==false){ 
      wx.showToast({
        title: '请选择图片',
        icon: 'none',
      })
    }else{
      var numvalue = _this.data.current
      console.log( _this.data.list[_this.data.current].tempimg)
      wx.showLoading({
        title: '生成图片中...',
      })
      _this.setData({
        changeStyle: true,
      })
      wx.uploadFile({
        url: 'https://experimentforzcl.cn:8080',
        filePath: _this.data.list[_this.data.current].tempimg,
        name: 'file',
        formData:{'style': _this.data.modellist[_this.data.current],
            'original_color': Number(_this.data.original_color),
            'blend_alpha': Number(_this.data.blend_alpha)
          },
        success (res){
          if(res.statusCode==200){
            var temp1 = 'list[' + numvalue + '].proUrl'
            var temp2 = 'list[' + numvalue + '].generate'
            wx.hideLoading()
            _this.setData({
              [temp1]: "data:image/png;base64," + res.data,
              [temp2]: true,
              changeStyle: false,
            })
            wx.hideLoading(),
            Notify({
              type: 'success',
              message: '生成成功',
              duration: 1000,
            });
          }
        }
      })
    }
  },

// // 扫描全能王函数
//   processImg: function() {
//     var _this = this
//     // 判断是否有图像
//     if(this.data.src == ''){ 
//       wx.showToast({
//         title: '请选择图片',
//         icon: 'none',
//       })
//     }else{
//       wx.showLoading({
//         title: '处理图片中...',
//       })
//       // 传送图像
//       wx.uploadFile({
//         // 改下地址！！！！！
//         url: 'https://experimentforzcl.cn:8080',
//         filePath: _this.data.src,
//         name: 'file',
//         // 传送功能标志、参数值
//         formData:{
//           'flag': _this.data.flag,
//           'parameter': Number(_this.data.parameter),
//           },
//         success (res){
//           if(res.statusCode==200){
//             wx.hideLoading()
//             _this.setData({
//               // 转换图像格式
//               src: "data:image/png;base64," + res.data,
//             })
//             wx.hideLoading(),
//             wx.showToast({
//               title: '处理成功',//提示文字
//               duration:1000,//显示时长
//               icon:'success', //图标，支持"success"、"loading" 
//             })
//           }else{
//             wx.showToast({
//               title: '处理失败',//提示文字
//               duration:1000,//显示时长
//               icon:'error', //图标
//             })
//           }
//         }
//       })
//     }
//   },


  changeColor: function(res) {
    this.setData({
      original_color: res.detail/100
    })
    wx.showToast({
      icon: 'none',
      title: `颜色保留：${res.detail}%`,
    });
  },

  styleChange: function(res) {
    this.setData({
      blend_alpha: res.detail/100
    })
    wx.showToast({
      icon: 'none',
      title: `风格占比：${res.detail}%`,
    });
  },

  gotoShare: function() {
    this.setData({
      showShare: true,
    })
  },

  shareSelect(res) {
    var _this = this
    if(res.detail.index==2){
      if(_this.data.list[_this.data.current].generate==true){
        var number = Math.random();
        wx.getFileSystemManager().writeFile({
          filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
          data: _this.data.list[_this.data.current].proUrl.slice(22),
          encoding: 'base64',
          success: res => {
            wx.saveImageToPhotosAlbum({
              filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
              success: function (res) {
                wx.showToast({
                  title: '保存成功!',
                  icon: "none"
                })
              },
              fail: function (err) {
                wx.showToast({
                  title: '保存失败',
                  icon: "none"
                })
              }
            })
          },
        })
      }else{
        wx.showToast({
          title: '保存失败，请先生成图片',
          icon: 'none'
        })
      }
    }else if(res.detail.index==3){
      wx.navigateTo({
        url: '/pages/share/share',
      })
    }
    this.shareClose();
  },

  shareClose() {
    this.setData({
      showShare: false
    });
  }
})