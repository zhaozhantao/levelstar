require=function a(o,n,s){function l(e,t){if(!n[e]){if(!o[e]){var r="function"==typeof require&&require;if(!t&&r)return r(e,!0);if(g)return g(e,!0);var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}var c=n[e]={exports:{}};o[e][0].call(c.exports,function(t){return l(o[e][1][t]||t)},c,c.exports,a,o,n,s)}return n[e].exports}for(var g="function"==typeof require&&require,t=0;t<s.length;t++)l(s[t]);return l}({Comm:[function(t,e,r){"use strict";cc._RF.push(e,"1d260IA5QhB5Lx5Sb8wIrja","Comm");var c=t("./prefab/TipPrefab.js"),l=t("./prefab/ConfirmDialogPrefab.js");e.exports={gridSize:10,calcClearScore:function(t){return t*t*5},calcLastScore:function(t){return Math.max(0,2e3-t*t*20)},tip:function(i){console.log("tip"),cc.loader.loadRes("prefab/TipPrefab",function(t,e){if(t)console.log(t);else{var r=cc.instantiate(e);cc.director.getScene().addChild(r),r.getComponent(c).show(i)}})},confirm:function(i,c,a,o,n,s){console.log("confirm"),cc.loader.loadRes("prefab/ConfirmDialogPrefab",function(t,e){if(t)console.log(t);else{var r=cc.instantiate(e);cc.director.getScene().addChild(r),r.getComponent(l).show(i,c,a,o,n,s)}})},readLevelScores:function(){var t=cc.sys.localStorage.getItem("LEVEL_SCORES");this.levelScores=t?JSON.parse(t):{}},saveLevelScores:function(){var t=JSON.stringify(this.levelScores);cc.sys.localStorage.setItem("LEVEL_SCORES",t)},calcScoreLogic:function(){for(var t in this.totalScore=0,this.minScoreLevel=0,this.min2ScoreLevel=0,this.levelScores){var e=this.levelScores[t];this.totalScore+=e}var r=0;for(console.log(this.totalScore,this.calcTargetScore(r));this.totalScore>=this.calcTargetScore(r);)r++;this.maxLevel=r;var i=Number.POSITIVE_INFINITY,c=Number.POSITIVE_INFINITY;for(t=1;t<=this.maxLevel;t++){(e=this.levelScores[t.toString()])||(e=0),e<i||e==i&&this.minScoreLevel>t?(i=e,this.min2ScoreLevel=this.minScoreLevel,this.minScoreLevel=t):(e<c||e==c&&this.min2ScoreLevel>t)&&(c=e,this.min2ScoreLevel=t)}},calcTargetScore:function(t){if(this.levelCfg||(this.levelCfg={}),this.levelCfg[t.toString()])return this.levelCfg[t.toString()];var e=1e3;return 1<t?(e=this.calcTargetScore(t-1),e+=0==e%2?2e3:3e3,e+=300*Math.floor(t/10)):0==t&&(e=0),this.levelCfg[t.toString()]=e},setLevelScore:function(t,e){console.log("setLevelScore",t,e),this.levelScores[t.toString()]=e},calcTargetStr:function(){this.targetStrTab={};var t=0;this.min2ScoreLevel&&0!=this.min2ScoreLevel&&((t=this.levelScores[this.min2ScoreLevel])?t++:t=0);var e=0;if(this.maxLevel){var r=this.levelScores[this.currentLevel];r||(r=0),e=this.calcTargetScore(this.maxLevel)-(this.totalScore-r)}e<t?0<e?(this.targetStrTab.littleTarget=e,this.targetStrTab.littleTargetStr="(解锁第"+(this.maxLevel+1)+"关)\n",this.targetStrTab.bigTarget=t,this.targetStrTab.bigTargetStr="(超过第"+this.min2ScoreLevel+"关)"):(this.targetStrTab.oneTarget=t,this.targetStrTab.oneTargetStr="(超过第"+this.min2ScoreLevel+"关)"):0<t?(this.targetStrTab.littleTarget=t,this.targetStrTab.littleTargetStr="(超过第"+this.min2ScoreLevel+"关)",this.targetStrTab.bigTarget=e,this.targetStrTab.bigTargetStr="(解锁第"+(this.maxLevel+1)+"关)\n"):(this.targetStrTab.oneTarget=e,this.targetStrTab.oneTargetStr="(解锁第"+(this.maxLevel+1)+"关)\n")}},cc._RF.pop()},{"./prefab/ConfirmDialogPrefab.js":"ConfirmDialogPrefab","./prefab/TipPrefab.js":"TipPrefab"}],ConfirmDialogPrefab:[function(t,e,r){"use strict";cc._RF.push(e,"c7199ySzr1IhI7NQxciQpOR","ConfirmDialogPrefab"),cc.Class({extends:cc.Component,properties:{titleLabel:cc.Label,contentLabel:cc.Label,btn1Node:cc.Node,btn2Node:cc.Node,btn1Label:cc.Label,btn2Label:cc.Label},show:function(t,e,r,i,c,a){this.titleLabel.string=t,this.contentLabel.string=e,this.btn1Label.string=r,this.btn1Cb=i,c?(this.btn2Label.string=c,this.btn2Cb=a):(this.btn1Node.x=0,this.btn2Node.active=!1)},btn1Click:function(){this.btn1Cb(),this.node.destroy()},btn2Click:function(){this.btn2Cb(),this.node.destroy()},fullScreenBtnClick:function(){console.log("fullScreenBtnClick")},dialogBtnClick:function(){console.log("dialogBtnClick")}}),cc._RF.pop()},{}],GameScene:[function(t,e,r){"use strict";cc._RF.push(e,"e3996EcHbNIBo8DcXtt3l87","GameScene");var l=t("../prefab/StarPrefab.js"),g=t("../Comm.js");cc.Class({extends:cc.Component,properties:{starPrefab:cc.Prefab,starGrid:cc.Node,scoreLabel:cc.Label,scorePreLabel:cc.Label,targetLabel:cc.Label},onLoad:function(){console.log("登录统计");var r=this;this.starGame(),this.starGrid.on(cc.Node.EventType.TOUCH_START,function(t){var e=r.starGrid.convertToNodeSpace(t.touch.getLocation());r.touchStar(parseInt(e.x/(r.starGrid.width/10)),parseInt(e.y/(r.starGrid.height/10)))});var t=cc.director.getWinSize();this.scoreLabel.node.y=t.height/2-(t.height-t.width)/2/2,this.targetLabel.node.y=t.height/2-50},starGame:function(){this.initStatus(),this.initGrid(),g.calcTargetStr(),this.targetButtonClick(),this.updateTargetLabel()},initStatus:function(){this.stVar={},this.stVar.selected=!1,this.totalScore=0},initGrid:function(){if(this.gridStarUi)for(var t=0;t<g.gridSize;t++)for(var e=0;e<g.gridSize;e++)this.gridStarUi[t][e]&&this.gridStarUi[t][e].destroy();for(var r=[],i=[],c=0;c<g.gridSize;c++){r[c]=[],i[c]=[];for(var a=0;a<g.gridSize;a++){var o=cc.instantiate(this.starPrefab),n=o.getComponent(l);o.parent=this.starGrid,n.setGridXY(c,a);var s=parseInt(5*Math.random()+1);n.setType(s),r[c][a]=s,i[c][a]=o}}this.gridData=r,this.gridStarUi=i},updateTargetLabel:function(){g.targetStrTab.oneTarget?this.totalScore>=g.targetStrTab.oneTarget?this.targetLabel.string="目标:"+g.targetStrTab.oneTarget+"分(已完成)":this.targetLabel.string="目标:"+g.targetStrTab.oneTarget+"分":this.totalScore<g.targetStrTab.littleTarget?this.targetLabel.string="小目标:"+g.targetStrTab.littleTarget+"分":this.totalScore<g.targetStrTab.bigTarget?this.targetLabel.string="大目标:"+g.targetStrTab.bigTarget+"分":this.targetLabel.string="大目标:"+g.targetStrTab.bigTarget+"分(已完成)"},touchStar:function(t,e){if(this.stVar.selected)this.connectContain(t,e)?(this.cleanOnce(t,e),this.stVar.selected=!1):(this.setConnectStarSelect(!1),this.scorePreLabel.node.active=!1,this.touchStar(t,e));else{if(0==this.gridData[t][e])return;this.stVar.connectStars=[[t,e]],this.checkStar(t,e),2<=this.stVar.connectStars.length&&(this.setConnectStarSelect(!0),this.scorePreLabel.string=g.calcClearScore(this.stVar.connectStars.length),this.scorePreLabel.node.stopAllActions(),this.scorePreLabel.node.setPosition(this.gridStarUi[t][e].position),this.scorePreLabel.node.opacity=255,this.scorePreLabel.fontSize=32,this.scorePreLabel.node.active=!0)}},checkStar:function(t,e){for(var r=this.gridData[t][e],i=[[t+1,e],[t-1,e],[t,e-1],[t,e+1]],c=i.length-1;0<=c;c--){var a=i[c][0],o=i[c][1];this.inGrid(a,o)&&this.gridData[a][o]==r&&!this.connectContain(a,o)&&(this.stVar.connectStars[this.stVar.connectStars.length]=[a,o],this.checkStar(a,o))}},inGrid:function(t,e){return 0<=t&&t<g.gridSize&&0<=e&&e<g.gridSize},connectContain:function(t,e){for(var r=this.stVar.connectStars.length-1;0<=r;r--){var i=this.stVar.connectStars[r];if(i[0]==t&&i[1]==e)return!0}return!1},setConnectStarSelect:function(t){for(var e=this.stVar.connectStars.length-1;0<=e;e--){var r=this.stVar.connectStars[e];this.gridStarUi[r[0]][r[1]].getComponent(l).setSelected(t)}this.stVar.selected=t},cleanOnce:function(){if(this.scorePreLabel.fontSize=64,this.scorePreLabel.node.runAction(cc.sequence(cc.moveBy(.2,cc.p(0,20)),cc.delayTime(.8),cc.spawn(cc.moveBy(.2,cc.p(0,10)),cc.fadeOut(.2)))),this.totalScore+=parseInt(this.scorePreLabel.string),this.scoreLabel.string=this.totalScore,this.updateTargetLabel(),this.clearConnectStar(),this.fallDownStar(),this.fallLeftStar(),this.checkOver()){console.log("不能再消除了");var t=this.checkCount(),e=g.calcLastScore(t);this.totalScore+=e,this.scoreLabel.string=this.totalScore,console.log("计算剩余星星分"),console.log("最终得分",this.totalScore);var r="";if(g.targetStrTab.oneTarget){var i="已完成";this.totalScore<g.targetStrTab.oneTarget&&(i="未完成"),r="目标:"+g.targetStrTab.oneTarget+"分"+g.targetStrTab.oneTargetStr+i}else{var c="已完成";this.totalScore<g.targetStrTab.littleTarget&&(c="未完成");var a="已完成";this.totalScore<g.targetStrTab.bigTarget&&(a="未完成"),r="小目标:"+g.targetStrTab.littleTarget+"分"+g.targetStrTab.littleTargetStr+c+"\n大目标:"+g.targetStrTab.bigTarget+"分"+g.targetStrTab.bigTargetStr+a}var o=g.levelScores[g.currentLevel.toString()];(!o||this.totalScore>o)&&(console.log("破记录了"),g.setLevelScore(g.currentLevel,this.totalScore),g.saveLevelScores(),g.calcScoreLogic()),g.confirm("不能再消除了","您的得分:"+this.totalScore+"(其中剩余星星"+t+"附加分:"+e+")","确定",function(){g.confirm("目标",r,"回主菜单",function(){cc.director.loadScene("MainScene")})})}},clearConnectStar:function(){for(var t=this.stVar.connectStars.length-1;0<=t;t--){var e=this.stVar.connectStars[t];this.gridData[e[0]][e[1]]=0,this.gridStarUi[e[0]][e[1]].destroy()}},fallDownStar:function(){for(var t=0;t<g.gridSize;t++)for(var e=0,r=0;r<g.gridSize;r++)0==this.gridData[t][r]&&e++,0<e&&0<this.gridData[t][r]&&(this.gridData[t][r-e]=this.gridData[t][r],this.gridData[t][r]=0,this.gridStarUi[t][r].getComponent(l).goTo(t,r-e,0),this.gridStarUi[t][r-e]=this.gridStarUi[t][r],this.gridStarUi[t][r]=null)},fallLeftStar:function(){for(var t=0,e=0;e<g.gridSize;e++)if(0==this.gridData[e][0]&&t++,0!=this.gridData[e][0]&&0!=t)for(var r=0;r<g.gridSize&&0<this.gridData[e][r];r++)this.gridData[e-t][r]=this.gridData[e][r],this.gridData[e][r]=0,this.gridStarUi[e][r].getComponent(l).goTo(e-t,r,.1),this.gridStarUi[e-t][r]=this.gridStarUi[e][r],this.gridStarUi[e][r]=null},checkOver:function(){for(var t=0;t<g.gridSize;t++)for(var e=0;e<g.gridSize;e++){var r=this.gridData[t][e];if(0==r)break;for(var i=[[t+1,e],[t-1,e],[t,e-1],[t,e+1]],c=0;c<i.length;c++){var a=i[c][0],o=i[c][1];if(this.inGrid(a,o)&&this.gridData[a][o]==r)return!1}}return!0},checkCount:function(){for(var t=0,e=0;e<g.gridSize;e++)for(var r=0;r<g.gridSize;r++){0<this.gridData[e][r]&&t++}return t},targetButtonClick:function(){var t="";t=g.targetStrTab.oneTarget?"目标:"+g.targetStrTab.oneTarget+"分"+g.targetStrTab.oneTargetStr:"小目标:"+g.targetStrTab.littleTarget+"分"+g.targetStrTab.littleTargetStr+"\n大目标:"+g.targetStrTab.bigTarget+"分"+g.targetStrTab.bigTargetStr,console.log(t),g.confirm("目标",t,"确定",function(){})}}),cc._RF.pop()},{"../Comm.js":"Comm","../prefab/StarPrefab.js":"StarPrefab"}],LevelCurPrefab:[function(t,e,r){"use strict";cc._RF.push(e,"046c9RjCshG748pEaUzb9At","LevelCurPrefab");var i=t("../Comm.js");cc.Class({extends:cc.Component,properties:{strLabel:cc.Label},setLevel:function(t){this.level=t;var e=i.levelScores[t.toString()];e||(e=0),this.strLabel.string="第"+t+"关 "+e+"分"},mainButtonClick:function(){this.cb(this.level)},setClickCallback:function(t){this.cb=t}}),cc._RF.pop()},{"../Comm.js":"Comm"}],LevelPrefab:[function(t,e,r){"use strict";cc._RF.push(e,"5c0b0KWY05MQIxdXOuvrjyk","LevelPrefab");var i=t("../Comm.js");cc.Class({extends:cc.Component,properties:{strLabel:cc.Label,lock:cc.Node},setLevel:function(t){this.level=t;var e=i.levelScores[t.toString()];e||(e=0),this.strLabel.string="第"+t+"关 "+e+"分",this.lock.active=!1},setUnlockInfoForLevel:function(t){this.level=t,this.strLabel.string="总分"+i.calcTargetScore(this.level-1)+"解锁第"+t+"关",this.lock.active=!0},mainButtonClick:function(){this.cb(this.level)},setClickCallback:function(t){this.cb=t}}),cc._RF.pop()},{"../Comm.js":"Comm"}],MainScene:[function(t,e,r){"use strict";cc._RF.push(e,"04fb30nHQBA7J6o6i9uMytG","MainScene");var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=t("../Comm.js"),o=t("../prefab/LevelPrefab.js"),n=t("../prefab/LevelCurPrefab.js");cc.Class({extends:cc.Component,properties:{levelLayout:cc.Node,levelPrefab:cc.Prefab,levelCurPrefab:cc.Prefab,totalScoreLabel:cc.Label,scrollView:cc.ScrollView},onLoad:function(){a.readLevelScores(),a.calcScoreLogic(),this.totalScoreLabel.string="总分:"+a.totalScore;for(var t=1;t<a.minScoreLevel;t++){(e=cc.instantiate(this.levelPrefab)).getComponent(o).setLevel(t),e.getComponent(o).setClickCallback(function(t){a.currentLevel=t,console.log("Comm.currentLevel",a.currentLevel),cc.director.loadScene("GameScene")}),this.levelLayout.addChild(e)}(e=cc.instantiate(this.levelCurPrefab)).getComponent(n).setLevel(a.minScoreLevel),e.getComponent(n).setClickCallback(function(t){a.currentLevel=a.minScoreLevel,console.log("Comm.currentLevel",a.currentLevel),cc.director.loadScene("GameScene")}),this.levelLayout.addChild(e);for(t=a.minScoreLevel+1;t<=a.maxLevel;t++){var e;(e=cc.instantiate(this.levelPrefab)).getComponent(o).setLevel(t),e.getComponent(o).setClickCallback(function(t){a.currentLevel=t,console.log("Comm.currentLevel",a.currentLevel),cc.director.loadScene("GameScene")}),this.levelLayout.addChild(e)}if((e=cc.instantiate(this.levelPrefab)).getComponent(o).setUnlockInfoForLevel(a.maxLevel+1),e.getComponent(o).setClickCallback(function(t){a.tip("总分达到"+a.calcTargetScore(t-1)+"才能玩这一关")}),this.levelLayout.addChild(e),this.scheduleOnce(function(){var t=this.scrollView.getMaxScrollOffset(),e=Math.min(1,Math.max(0,(a.minScoreLevel-6)/(a.maxLevel+1-7)));console.log("percent",e),this.scrollView.scrollToOffset(cc.p(0,t.y*e),.3)},0),console.log("弄一下统计的东西"),console.log("typeof","undefined"==typeof anysdk?"undefined":c(anysdk)),"undefined"!=typeof anysdk){var r=anysdk.agentManager;if(console.log("agent",r),r){var i=r.getAnalyticsPlugin();console.log("user_plugin",i),i&&(i.setAccount&&i.setAccount({Account_Id:"123456",Account_Name:"test",Account_Type:anysdk.AccountType.ANONYMOUS.toString(),Account_Level:"0",Account_Age:"0",Account_Operate:anysdk.AccountOperate.LOGIN.toString(),Account_Gender:anysdk.AccountGender.UNKNOWN.toString(),Server_Id:"0"}),i.startSession&&i.startSession(),console.log("统计的东西弄完了"))}}},startButtonClick:function(){}}),cc._RF.pop()},{"../Comm.js":"Comm","../prefab/LevelCurPrefab.js":"LevelCurPrefab","../prefab/LevelPrefab.js":"LevelPrefab"}],StarPrefab:[function(t,e,r){"use strict";cc._RF.push(e,"22bb0VNWAxF/ZMJwZXVIaIx","StarPrefab"),cc.Class({extends:cc.Component,properties:{pic1:cc.SpriteFrame,pic2:cc.SpriteFrame,pic3:cc.SpriteFrame,pic4:cc.SpriteFrame,pic5:cc.SpriteFrame},onLoad:function(){this.node.setScale(1.1)},setType:function(t){this.starType=t,this.getComponent(cc.Sprite).spriteFrame=this["pic"+t]},setGridXY:function(t,e){this.gridX=t,this.gridY=e,this.node.setPosition(75*(t-5)+37.5,75*(e-5)+37.5)},setSelected:function(t){t?this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.3,1.1),cc.scaleTo(.3,.95)))):(this.node.stopAllActions(),this.node.setScale(1.1))},goTo:function(t,e,r){this.gridX=t,this.gridY=e,this.node.runAction(cc.sequence(cc.delayTime(r),cc.moveTo(.1,cc.p(75*(t-5)+37.5,75*(e-5)+37.5))))}}),cc._RF.pop()},{}],TipPrefab:[function(t,e,r){"use strict";cc._RF.push(e,"2fc39ba/flCCaXZ48+4ZaMH","TipPrefab"),cc.Class({extends:cc.Component,properties:{tipLabel:cc.Label,tipBg:cc.Node},show:function(t){var e=this;this.tipLabel.string=t,this.node.setPosition(cc.director.getWinSize().width/2,100),this.node.runAction(cc.sequence(cc.delayTime(2),cc.fadeOut(.3),cc.callFunc(function(){e.node.destroy()})))}}),cc._RF.pop()},{}]},{},["Comm","ConfirmDialogPrefab","LevelCurPrefab","LevelPrefab","StarPrefab","TipPrefab","GameScene","MainScene"]);