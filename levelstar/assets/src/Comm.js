
var TipPrefab = require("./prefab/TipPrefab.js");
var ConfirmDialogPrefab = require("./prefab/ConfirmDialogPrefab.js");
module.exports={
    // 网格大小
    gridSize:10,

    // 计算消除得分
    calcClearScore: function (count){
        return count * count * 5;
    },
    // 计算剩余星星所能得的分
    calcLastScore: function(count){
        return math.max(0, 2000 - count*count*20)
    },
    tip: function(tipStr){
        console.log("tip")
        // 加载 Prefab
        cc.loader.loadRes("prefab/TipPrefab", function (err, prefab) {
            if (err) {
                console.log(err);
                return;
            }
            var newNode = cc.instantiate(prefab);
            cc.director.getScene().addChild(newNode);
            newNode.getComponent(TipPrefab).show(tipStr);
        });
    },
    confirm: function(title, content, btn1Str, btn1Cb, btn2Str, btn2Cb){
        console.log("confirm")
        // 加载 Prefab
        cc.loader.loadRes("prefab/ConfirmDialogPrefab", function (err, prefab) {
            if (err) {
                console.log(err);
                return;
            }
            var newNode = cc.instantiate(prefab);
            cc.director.getScene().addChild(newNode);
            newNode.getComponent(ConfirmDialogPrefab).show(title, content, btn1Str, btn1Cb, btn2Str, btn2Cb);
        });
    },
};