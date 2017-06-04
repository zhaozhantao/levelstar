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
};