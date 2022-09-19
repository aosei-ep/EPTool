// pages/StopWatch/StopWatch.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // judge判断状态{0: 开始; 1: 停止; 2: 重置}
        judge: 0,
        // 三个按钮的位置
        dist: ['0, 0', '0, 0', '0, 0'],
        time: "00:00.000",      // 秒表实践
        // 五盏灯的颜色
        light: ['#222', '#222', '#222', '#222', '#222'],
        stopWatch: null,    // 秒表开始前的等待时间
        startTime: null,    // 五盏红灯熄灭时间(0~5秒)
        timedTime: null,    // settimeout id
        timeStamp: null,
        timedInter: null,   // setinterval id
        timedReset: null,   // setintreset id
        timeStampStart: null,   // 开始时间的时间戳
        // stopOnly: "background-color: rgba(0,0,0,0);color: rgba(0,0,0,0);"
        stopOnly: ['', 'border-radius:3vw;line-height:12vw;'],     // 停止按钮大小
        timeOnly: 'font-size:6vw;'    // 时间文字大小
    },

    /**
     * 开始
     */
    start() {
        var data = this.data
        data.judge = 1;
        data.dist[0] = '0, -14vw';
        data.dist[1] = '0, -14vw';
        data.dist[2] = '0, -14vw';
        data.stopOnly[0] = 'width:60vw;height:40vw;'
        data.stopOnly[1] = 'width:60vw;height:40vw;line-height:40vw;font-size:10vw;border-radius:5vw;'
        this.setData({
            judge: data.judge,
            dist: data.dist,
            stopOnly: data.stopOnly
        });
        this.startGame();
    },

    /**
     * 停止
     */
    stop() {
        var data = this.data
        if (data.timeStamp != null) return;
        if (data.timeStampStart == null) {
            wx.showToast({
                title: "提前了！",    // 显示的标题
                icon: "error",       // 显示的图标
                duration: 1000       // 显示的时间2s
            });
            return;
        }
        data.judge = 2;
        data.dist[0] = '0, -28vw';
        data.dist[1] = '0, -28vw';
        data.dist[2] = '0, -28vw';
        data.timeOnly = 'font-size:7vw;box-shadow: 0 0 1vw .5vw rgba(0, 0, 0, .3);'
        data.timeStamp = new Date().getTime() - data.timeStampStart;
        let s = parseInt(data.timeStamp / 1000);
        let ms = data.timeStamp % 1000;
        data.time = "00:" + s.toString().padStart(2, '0') + ":" + ms.toString().padStart(3, '0');
        data.stopOnly = ['', 'border-radius:3vw;line-height:12vw;'];
        this.setData({
            judge: data.judge,
            dist: data.dist,
            time: data.time,
            timeOnly: data.timeOnly,
            stopOnly: data.stopOnly
        });
        clearInterval(data.timedInter);
        clearTimeout(data.timedReset);
        clearTimeout(data.timedTime);
        data.timedInter = null;
        data.timedReset = null;
        data.timedTime = null;
    },

    /**
     * 重置
     */
    reset() {
        var data = this.data
        data.judge = 0;
        data.dist[0] = '0, 0';
        data.dist[1] = '0, 0';
        data.dist[2] = '0, 0';
        data.time = '00:00.000';
        data.timeOnly = 'font-size:6vw;border-radius:3vw;';
        this.setData({
            judge: data.judge,
            dist: data.dist,
            time: data.time,
            timeOnly: data.timeOnly
        });
        clearInterval(data.timedInter);
        clearTimeout(data.timedReset);
        clearTimeout(data.timedTime);
        data.timeStampStart = null;
        data.timedInter = null;
        data.timedReset = null;
        data.timedTime = null;
        data.timeStamp = null;
    },

    startGame() {
        var data = this.data;
        if (data.judge == 0) return;
        if (data.timedInter != null) return;
        data.startTime = parseInt(Math.random() * 5 / 0.001);
        console.log(data.startTime);
        var time = '00:00.000';
        this.setData({
            time: time
        });
        this.lightStart();
        var i = 1;
        data.stopWatch = setTimeout(() => {
            data.timeStampStart = new Date().getTime();
            data.timedInter = setInterval(() => {
                if (i > 6999) {
                    this.stop();
                } else {
                    let s = parseInt(i / 1000);
                    let ms = i % 1000;
                    time = "00:" + s.toString().padStart(2, '0') + ":" + ms.toString().padStart(3, '0');
                }
                this.setData({
                    time: time
                });
                i += 9;
            }, 9);
        }, 5000 + data.startTime)
    },

    resetTime() {
        for (let j = 0; j < 5; j++) {
            this.data.light[j] = '#222';
            this.setData({
                light: this.data.light
            });
        }
    },

    lightStart() {
        this.resetTime();
        var data = this.data;
        for (let j = 0; j < 5; j++) {
            data.timedTime = setTimeout(() => {
                data.light[j] = 'red';
                this.setData({
                    light: data.light
                });
            }, 1000 * j);
        }
        data.timedReset = setTimeout(() => {
            this.resetTime();
        }, 5000 + data.startTime)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})