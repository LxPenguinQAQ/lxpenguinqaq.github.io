// 题目描述:给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1

// 原理类似于斐波拉契队列。

const coinChange = function (coins, amount) {
    // 用于保存每个目标总额对应的最小硬币个数
    const f = [];
    // 提前定义已知情况
    f[0] = 0;
    // 遍历 [1, amount] 这个区间的硬币总额
    for (let i = 1; i <= amount; i++) {
        // 求的是最小值，因此我们预设为无穷大，确保它一定会被更小的数更新
        f[i] = Infinity;
        // 循环遍历每个可用硬币的面额
        for (let j = 0; j < coins.length; j++) {
            // 若硬币面额小于目标总额，则问题成立
            if (i - coins[j] >= 0) {
                // 状态转移方程，当当前金额可以使用用面额更大时，+1表示使用一枚大面额硬币再加上减去该金额后最少需要硬币的个数
                f[i] = Math.min(f[i], f[i - coins[j]] + 1);
            }
        }
    }
    // 若目标总额对应的解为无穷大，则意味着没有一个符合条件的硬币总数来更新它，本题无解，返回-1
    if (f[amount] === Infinity) {
        return -1;
    }
    // 若有解，直接返回解的内容
    return f[amount];
};

console.log(coinChange([1, 2, 5], 11));
