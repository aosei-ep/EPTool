// pages/WhatToEat/WhatToEat.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        foods: ["KFC", "麦当劳", "海底捞"],
        add_food: "",
        res_food: "",
        num: 0
    },

    /**
     * @description 删除数组中的food
     * @param {*} event 
     */
    delFood(event) {
        var food = event.currentTarget.dataset.item
        var data = this.data;
        for (let i = 0; i < data.foods.length; i++) {
            if (data.foods[i] == food) {
                data.foods.splice(i, 1);
                break;
            }
        }
        this.setData({
            foods: data.foods
        });
    },

    /**
     * @description 向数组中添加food
     * @param {*} event 
     */
    addFood(event) {
        var data = this.data;
        if (data.add_food == "") {
            wx.showToast({
                title: "不能为空",  // 显示的标题
                icon: "error",     // 显示的图标
                duration: 2000     // 显示的时间2s
            });
        } else if (data.foods.indexOf(data.add_food) != -1) {
            data.add_food = "";
            wx.showToast({
                title: "已经存在",  // 显示的标题
                icon: "error",     // 显示的图标
                duration: 2000     // 显示的时间2s
            });
        } else {
            data.foods.push(data.add_food);
            // console.log(data.foods)
            this.setData({
                foods: data.foods
            });
            data.add_food = "";
        }
        this.setData({
            add_food: data.add_food
        })
    },

    /**
     * @description 获取add_food input框中的内容
     * @param {*} event 
     */
    getValue(event) {
        this.data.add_food = event.detail.value;
    },

    /**
     * @description 随机获取数组中的食物
     */
    resFood() {
        var data = this.data;
        data.num += 1;
        if (data.foods.length == 0) {
            wx.showToast({
                title: "食物筐为空",  // 显示的标题
                icon: "error",       // 显示的图标
                duration: 2000       // 显示的时间2s
            });
        } else {
            var timestamp = new Date().getTime() % 1000;
            var random1 = Math.round(Math.random() * 50);
            var random2 = Math.round(Math.random() * 49);
            var index = (timestamp * random1 + random2) % data.foods.length;
            data.res_food = data.foods[index];
        }
        this.setData({
            res_food: data.res_food,
            num: data.num
        })
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