var Comm = require("../Comm.js");
cc.Class({
    extends: cc.Component,

    properties: {
        strLabel: cc.Label,
    },

    // 显示对话框
    showDialog: function() {
        // 超过倒数第二关的目标分
        var target1Score = 0;
        if (Comm.min2ScoreLevel && Comm.min2ScoreLevel != 0){
            target1Score = Comm.levelScores[Comm.min2ScoreLevel];
            if (target1Score) {
                target1Score ++; // 要超过倒数第二，所以得加一分，要不然不能算超过
            } else {
                target1Score = 0;
            }
        }
        var target2Score = 0;
        if (Comm.maxLevel){
            // 目标分=解锁分-(总分-当前关分)
            target2Score = Comm.calcTargetScore(Comm.maxLevel)-(Comm.totalScore-Comm.levelScores[Comm.currentLevel]);
        }
        if (target1Score > target2Score) {
            this.strLabel.string = "小目标:" + target2Score + "分(解锁第" + (Comm.maxLevel+1) + "关)\n"
                                     +"大目标:" + target1Score + "分(超过第" + Comm.min2ScoreLevel + "关)";
        } else {
            this.strLabel.string = "小目标:" + target1Score + "分(超过第" + Comm.min2ScoreLevel + "关)\n"
                                     +"大目标:" + target2Score + "分(解锁第" + (Comm.maxLevel+1) + "关)";
        }

        this.node.active = true;
    },
    // 点击了确定
    okButtonClick: function () {
        this.node.active = false;
    }
});
