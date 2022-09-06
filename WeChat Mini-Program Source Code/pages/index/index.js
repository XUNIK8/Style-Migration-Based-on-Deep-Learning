Page({
  data: {
    title: "ddemo",
    currentIndex: 0,
    oldIndex: 0,
    view: [{
      in: "",
      out: ""
    }, {
      in: "",
      out: ""
    }]
  },

  onLoad: function (t) {
    this.showAnimated();
    var t = this;
    setTimeout(function () {
      t.setData({
        bottom: "animated slideInUp"
      })
    }, 2e3), setTimeout(function () {
      t.setData({
        bottom_one: "animated slideInUp"
      })
    }, 210), setTimeout(function () {
      t.setData({
        bottom_two: "animated slideInUp"
      })
    }, 220), setTimeout(function () {
      t.setData({
        bottom_three: "animated slideInUp"
      })
    }, 230), setTimeout(function () {
      t.setData({
        bottom_four: "animated slideInUp"
      })
    }, 240), setTimeout(function () {
      t.setData({
        bottom_one: "bottom-4s-move"
      })
    }, 310), setTimeout(function () {
      t.setData({
        bottom_two: "bottom-3s-move"
      })
    }, 320), setTimeout(function () {
      t.setData({
        bottom_three: "bottom-2s-move"
      })
    }, 330), setTimeout(function () {
      t.setData({
        bottom_four: "bottom-1s-move"
      })
    }, 340)
  },

  onHide: function () {
    // this.cleanAnimated(), this.setData({
    //   bottom: "",
    //   bottom_one: "",
    //   bottom_two: "",
    //   bottom_three: "",
    //   bottom_four: ""
    // })
  },

  touchStart: function (t) {
    this.setData({
      startX: t.changedTouches[0].clientX
    })
  },

  touchEnd: function (t) {
    var e = this,
      n = this.data.view;
    this.setData({
      endX: t.changedTouches[0].clientX
    });
    var a = t.changedTouches[0].clientX - this.data.startX;
    if (a < -100) {
      if (this.data.currentIndex >= 1) return;
      this.setData({
        oldIndex: e.data.currentIndex,
        currentIndex: ++e.data.currentIndex
      }), n[this.data.oldIndex].out = "animated fadeOutLeft", n[this.data.oldIndex].in = "", n[this.data.currentIndex].in = "animated fadeInRight", n[this.data.currentIndex].out = "", this.setData({
        view: n
      }), this.cleanAnimated(), this.showAnimated()
    } else if (a > 100) {
      if (this.data.currentIndex <= 0) return;
      this.setData({
        oldIndex: e.data.currentIndex,
        currentIndex: --e.data.currentIndex
      }), n[this.data.oldIndex].out = "animated fadeOutRight", n[this.data.oldIndex].in = "", n[this.data.currentIndex].in = "animated fadeInLeft", n[this.data.currentIndex].out = "", this.setData({
        view: n
      }), this.cleanAnimated(), this.showAnimated()
    }
  },

  showAnimated: function () {
    var t = this;
    0 === this.data.currentIndex ? (setTimeout(function () {
      t.setData({
        one_one: "animated fadeIn",
        one_two: "animated bounceIn"
      })
    }, 1e3), setTimeout(function () {
      t.setData({
        one_three: "animated bounceIn"
      })
    }, 150), setTimeout(function () {
      t.setData({
        one_four: "animated bounceIn"
      })
    }, 180), setTimeout(function () {
      t.setData({
        one_five: "animated lightSpeedIn"
      })
    }, 190)) : 1 === this.data.currentIndex && (setTimeout(function () {
      t.setData({
        two_one: "animated fadeInDown",
        two_two: "animated fadeInUp"
      })
    }, 1e3), setTimeout(function () {
      t.setData({
        two_three: "animated zoomIn",
        two_four: "animated zoomIn"
      })
    }, 120), setTimeout(function () {
      t.setData({
        two_three: "two-music-one",
        two_four: "two-music-two"
      })
    }, 220))
  },

  cleanAnimated: function () {
    0 === this.data.oldIndex ? this.setData({
      one_one: "animated fadeOut",
      one_two: "animated fadeOut",
      one_three: "animated fadeOut",
      one_four: "animated fadeOut",
      one_five: "animated fadeOut"
    }) : 1 === this.data.oldIndex && this.setData({
      two_one: "animated fadeOut",
      two_two: "animated fadeOut",
      two_three: "animated fadeOut",
      two_four: "animated fadeOut",
      two_five: "animated fadeOut"
    })
  },

  navigate1: function () {
    wx.navigateTo({
      url: '/pages/main/main',
    })
  },

  navigate2: function () {
    wx.navigateTo({
      url: '/pages/introduce/introduce',
    })
  },

  navigate3: function () {
    wx.navigateTo({
      url: '/pages/mine/mine',
    })
  }
})