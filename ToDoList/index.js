const db = require('./db.js');
const inquirer = require('inquirer')
// 添加一个任务
module.exports.add = async (title) => {
  // 读取之前的任务
  const list = await db.read()
  // 添加一个任务
  list.push({ title, completed: false })
  // 存储一个任务
  await db.write(list)
}

// 清空任务
module.exports.clear = async () => {
  await db.write([])
}

// 展示所有任务
module.exports.showAll = async () => {
  const list = await db.read()
  list.map((task, index) => {
    // console.log(`${index} --- ${task.title}`)
    // if (task.completed) {
    //   console.log(`${index} ${task.title}`)
    // } else {
    //   console.log(`[ ] ${task.title}`)
    // }

    if (task.completed) {
      console.log(` [x] ${index + 1} - ${task.title}`)
    } else {
      console.log(` [_] ${index + 1} - ${task.title}`)
    }
  })
}
