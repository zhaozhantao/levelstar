require=function t(e,i,r){function c(a,o){if(!i[a]){if(!e[a]){var s="function"==typeof require&&require;if(!o&&s)return s(a,!0);if(n)return n(a,!0);var h=new Error("Cannot find module '"+a+"'");throw h.code="MODULE_NOT_FOUND",h}var l=i[a]={exports:{}};e[a][0].call(l.exports,function(t){var i=e[a][1][t];return c(i?i:t)},l,l.exports,t,e,i,r)}return i[a].exports}for(var n="function"==typeof require&&require,a=0;a<r.length;a++)c(r[a]);return c}({Comm:[function(t,e,i){"use strict";cc._RF.push(e,"1d260IA5QhB5Lx5Sb8wIrja","Comm");var r=t("./prefab/TipPrefab.js"),c=t("./prefab/ConfirmDialogPrefab.js");e.exports={gridSize:10,calcClearScore:function(t){return t*t*5},calcLastScore:function(t){return math.max(0,2e3-t*t*20)},tip:function(t){console.log("tip"),cc.loader.loadRes("prefab/TipPrefab",function(e,i){if(e)return void console.log(e);var c=cc.instantiate(i);cc.director.getScene().addChild(c),c.getComponent(r).show(t)})},confirm:function(t,e,i,r,n,a){console.log("confirm"),cc.loader.loadRes("prefab/ConfirmDialogPrefab",function(o,s){if(o)return void console.log(o);var h=cc.instantiate(s);cc.director.getScene().addChild(h),h.getComponent(c).show(t,e,i,r,n,a)})}},cc._RF.pop()},{"./prefab/ConfirmDialogPrefab.js":"ConfirmDialogPrefab","./prefab/TipPrefab.js":"TipPrefab"}],ConfirmDialogPrefab:[function(t,e,i){"use strict";cc._RF.push(e,"c7199ySzr1IhI7NQxciQpOR","ConfirmDialogPrefab"),cc.Class({"extends":cc.Component,properties:{titleLabel:cc.Label,contentLabel:cc.Label,btn1Node:cc.Node,btn2Node:cc.Node,btn1Label:cc.Label,btn2Label:cc.Label},show:function(t,e,i,r,c,n){this.titleLabel.string=t,this.contentLabel.string=e,this.btn1Label.string=i,this.btn2Label.string=c,this.btn1Cb=r,this.btn2Cb=n},btn1Click:function(){this.btn1Cb(),this.node.destroy()},btn2Click:function(){this.btn2Cb(),this.node.destroy()},fullScreenBtnClick:function(){console.log("fullScreenBtnClick")},dialogBtnClick:function(){console.log("dialogBtnClick")}}),cc._RF.pop()},{}],GameScene:[function(t,e,i){"use strict";cc._RF.push(e,"e3996EcHbNIBo8DcXtt3l87","GameScene");var r=t("../prefab/StarPrefab.js"),c=t("../Comm.js");cc.Class({"extends":cc.Component,properties:{starPrefab:cc.Prefab,starGrid:cc.Node,scoreLabel:cc.Label,scorePreLabel:cc.Label},onLoad:function(){var t=this;this.starGame(),this.starGrid.on(cc.Node.EventType.TOUCH_START,function(e){var i=t.starGrid.convertToNodeSpace(e.touch.getLocation());t.touchStar(parseInt(i.x/(t.starGrid.width/10)),parseInt(i.y/(t.starGrid.height/10)))})},starGame:function(){this.initStatus(),this.initGrid()},initStatus:function(){this.stVar={},this.stVar.selected=!1,this.totalScore=0},initGrid:function(){if(this.gridStarUi)for(var t=0;t<c.gridSize;t++)for(var e=0;e<c.gridSize;e++)this.gridStarUi[t][e]&&this.gridStarUi[t][e].destroy();for(var i=[],n=[],a=0;a<c.gridSize;a++){i[a]=[],n[a]=[];for(var o=0;o<c.gridSize;o++){var s=cc.instantiate(this.starPrefab),h=s.getComponent(r);s.parent=this.starGrid,h.setGridXY(a,o);var l=parseInt(5*Math.random()+1);h.setType(l),i[a][o]=l,n[a][o]=s}}this.gridData=i,this.gridStarUi=n},touchStar:function(t,e){this.stVar.selected?this.connectContain(t,e)?(this.cleanOnce(t,e),this.stVar.selected=!1):(this.setConnectStarSelect(!1),this.scorePreLabel.node.active=!1,this.touchStar(t,e)):(this.stVar.connectStars=[[t,e]],this.checkStar(t,e),this.stVar.connectStars.length>=2&&(this.setConnectStarSelect(!0),this.scorePreLabel.string=c.calcClearScore(this.stVar.connectStars.length),this.scorePreLabel.node.stopAllActions(),this.scorePreLabel.node.setPosition(this.gridStarUi[t][e].position),this.scorePreLabel.node.opacity=255,this.scorePreLabel.fontSize=32,this.scorePreLabel.node.active=!0))},checkStar:function(t,e){for(var i=this.gridData[t][e],r=[[t+1,e],[t-1,e],[t,e-1],[t,e+1]],c=r.length-1;c>=0;c--){r[c];var n=r[c][0],a=r[c][1];this.inGrid(n,a)&&this.gridData[n][a]==i&&!this.connectContain(n,a)&&(this.stVar.connectStars[this.stVar.connectStars.length]=[n,a],this.checkStar(n,a))}},inGrid:function(t,e){return t>=0&&t<c.gridSize&&e>=0&&e<c.gridSize},connectContain:function(t,e){for(var i=this.stVar.connectStars.length-1;i>=0;i--){var r=this.stVar.connectStars[i];if(r[0]==t&&r[1]==e)return!0}return!1},setConnectStarSelect:function(t){for(var e=this.stVar.connectStars.length-1;e>=0;e--){var i=this.stVar.connectStars[e];this.gridStarUi[i[0]][i[1]].getComponent(r).setSelected(t)}this.stVar.selected=t},cleanOnce:function(){var t=this;this.scorePreLabel.fontSize=64,this.scorePreLabel.node.runAction(cc.sequence(cc.moveBy(.2,cc.p(0,20)),cc.delayTime(.8),cc.spawn(cc.moveBy(.2,cc.p(0,10)),cc.fadeOut(.2)))),this.totalScore+=parseInt(this.scorePreLabel.string),this.scoreLabel.string=this.totalScore,this.clearConnectStar(),this.fallDownStar(),this.fallLeftStar(),this.checkOver()&&(console.log("不能再消除了"),c.confirm("不能再消除了","您的得分:"+this.totalScore,"回主界面",function(){cc.director.loadScene("MainScene")},"重新开始",function(){t.starGame()}))},clearConnectStar:function(){for(var t=this.stVar.connectStars.length-1;t>=0;t--){var e=this.stVar.connectStars[t];this.gridData[e[0]][e[1]]=0,this.gridStarUi[e[0]][e[1]].destroy()}},fallDownStar:function(){for(var t=0;t<c.gridSize;t++)for(var e=0,i=0;i<c.gridSize;i++)0==this.gridData[t][i]&&e++,e>0&&this.gridData[t][i]>0&&(this.gridData[t][i-e]=this.gridData[t][i],this.gridData[t][i]=0,this.gridStarUi[t][i].getComponent(r).goTo(t,i-e,0),this.gridStarUi[t][i-e]=this.gridStarUi[t][i],this.gridStarUi[t][i]=null)},fallLeftStar:function(){for(var t=0,e=0;e<c.gridSize;e++)if(0==this.gridData[e][0]&&t++,0!=this.gridData[e][0]&&0!=t)for(var i=0;i<c.gridSize&&this.gridData[e][i]>0;i++)this.gridData[e-t][i]=this.gridData[e][i],this.gridData[e][i]=0,this.gridStarUi[e][i].getComponent(r).goTo(e-t,i,.1),this.gridStarUi[e-t][i]=this.gridStarUi[e][i],this.gridStarUi[e][i]=null},checkOver:function(){for(var t=0;t<c.gridSize;t++)for(var e=0;e<c.gridSize;e++){var i=this.gridData[t][e];if(0==i)break;for(var r=[[t+1,e],[t-1,e],[t,e-1],[t,e+1]],n=0;n<r.length;n++){var a=r[n][0],o=r[n][1];if(this.inGrid(a,o)&&this.gridData[a][o]==i)return!1}}return!0}}),cc._RF.pop()},{"../Comm.js":"Comm","../prefab/StarPrefab.js":"StarPrefab"}],MainScene:[function(t,e,i){"use strict";cc._RF.push(e,"04fb30nHQBA7J6o6i9uMytG","MainScene"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){},startButtonClick:function(){cc.director.loadScene("GameScene")}}),cc._RF.pop()},{}],StarPrefab:[function(t,e,i){"use strict";cc._RF.push(e,"22bb0VNWAxF/ZMJwZXVIaIx","StarPrefab"),cc.Class({"extends":cc.Component,properties:{pic1:cc.SpriteFrame,pic2:cc.SpriteFrame,pic3:cc.SpriteFrame,pic4:cc.SpriteFrame,pic5:cc.SpriteFrame},onLoad:function(){this.node.setScale(1.17)},setType:function(t){this.starType=t,this.getComponent(cc.Sprite).spriteFrame=this["pic"+t]},setGridXY:function(t,e){this.gridX=t,this.gridY=e,this.node.setPosition(75*(t-5)+37.5,75*(e-5)+37.5)},setSelected:function(t){t?this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.3,1),cc.scaleTo(.3,1.17)))):(this.node.stopAllActions(),this.node.setScale(1.17))},goTo:function(t,e,i){this.gridX=t,this.gridY=e,this.node.runAction(cc.sequence(cc.delayTime(i),cc.moveTo(.1,cc.p(75*(t-5)+37.5,75*(e-5)+37.5))))}}),cc._RF.pop()},{}],TipPrefab:[function(t,e,i){"use strict";cc._RF.push(e,"2fc39ba/flCCaXZ48+4ZaMH","TipPrefab"),cc.Class({"extends":cc.Component,properties:{tipLabel:cc.Label,tipBg:cc.Node},show:function(t){var e=this;this.tipLabel.string=t,this.node.setPosition(cc.director.getWinSize().width/2,100),this.node.runAction(cc.sequence(cc.delayTime(2),cc.fadeOut(.3),cc.callFunc(function(){e.node.destroy()})))}}),cc._RF.pop()},{}]},{},["Comm","ConfirmDialogPrefab","StarPrefab","TipPrefab","GameScene","MainScene"]);