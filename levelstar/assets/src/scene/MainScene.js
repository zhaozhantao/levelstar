var Comm = require("../Comm.js");
var LevelPrefab = require("../prefab/LevelPrefab.js");
var LevelCurPrefab = require("../prefab/LevelCurPrefab.js");
cc.Class({
    extends: cc.Component,

    properties: {
        levelLayout:cc.Node,
        levelPrefab:cc.Prefab,
        levelCurPrefab:cc.Prefab,
        totalScoreLabel:cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        // 读取分数表
        Comm.readLevelScores();
        Comm.calcScoreLogic();
        this.totalScoreLabel.string = "总分:" + Comm.totalScore;
        for (var i = 1; i < Comm.minScoreLevel; i++) {
            var cell = cc.instantiate(this.levelPrefab);
            cell.getComponent(LevelPrefab).setLevel(i);
            cell.getComponent(LevelPrefab).setClickCallback(function(level){
                // 开始玩这一关
                Comm.currentLevel = level;
                console.log("Comm.currentLevel", Comm.currentLevel);
                cc.director.loadScene("GameScene");
            });
            this.levelLayout.addChild(cell);
        }
        // 推荐关卡
        var cell = cc.instantiate(this.levelCurPrefab);
        cell.getComponent(LevelCurPrefab).setLevel(Comm.minScoreLevel);
        cell.getComponent(LevelCurPrefab).setClickCallback(function(level){
            // 开始玩这一关
            Comm.currentLevel = Comm.minScoreLevel;
            console.log("Comm.currentLevel", Comm.currentLevel);
            cc.director.loadScene("GameScene");
        });
        this.levelLayout.addChild(cell);

        for (var i = Comm.minScoreLevel+1; i <= Comm.maxLevel; i++) {
            var cell = cc.instantiate(this.levelPrefab);
            cell.getComponent(LevelPrefab).setLevel(i);
            cell.getComponent(LevelPrefab).setClickCallback(function(level){
                // 开始玩这一关
                Comm.currentLevel = level;
                console.log("Comm.currentLevel", Comm.currentLevel);
                cc.director.loadScene("GameScene");
            });
            this.levelLayout.addChild(cell);
        }
        // 未解锁
        var cell = cc.instantiate(this.levelPrefab);
        cell.getComponent(LevelPrefab).setUnlockInfoForLevel(Comm.maxLevel + 1);
        cell.getComponent(LevelPrefab).setClickCallback(function(level){
            Comm.tip("总分达到"+ Comm.calcTargetScore(level-1) + "才能玩这一关");
        });
        this.levelLayout.addChild(cell);

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    startButtonClick: function(){
        cc.director.loadScene("GameScene");
    },
});
