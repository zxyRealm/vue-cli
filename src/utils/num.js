/*
  将一个正整数分解为2的n次幂之和
*/
// 计算一个正整数相对2的最大幂值

const isNumber = num => typeof num === 'number'

export function countMaxPow (num) {
  let max = 0
  let current = num
  while (current>0) {
    current = parseInt(current / 2)
    max++
    if (num < Math.pow(2, max)) return max - 1
  }
  return max
}

//  获取最大幂值列表
//  最终返回分解数字列表值

export function countSplitList (num) {
  let powList = []
  let current = num
  if (num) {
    let max = countMaxPow(current)
    while (max > 0) {
      powList.push(max)
      current = current - Math.pow(2, max)
      max = countMaxPow(current)
    }
    if (num % 2 === 1) powList.push(0)
  }
  return powList.map(item => Math.pow(2, item))
}

/*
 * @params nums {Number, Array} 需要分解的参数值
 * @return {Array} 一维或者二维数组
 */
export function countNumsToList (nums) {
  let arr = []
  let allNumber = !nums.filter(i => !isNumber(i)).length
  if (Array.isArray(nums) && allNumber) {
    nums.forEach(num => {
      arr.push(countSplitList(num))
    })
  } else if (isNumber(nums)) {
    arr = countSplitList(nums)
  }
  return arr
}