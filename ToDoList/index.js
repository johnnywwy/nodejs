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
  // list.map((task, index) => {
  //   if (task.completed) {
  //     console.log(` [x] ${index + 1} - ${task.title}`)
  //   } else {
  //     console.log(` [_] ${index + 1} - ${task.title}`)
  //   }
  // })
  inquirer.prompt({
    type: 'list',
    name: 'index',
    message: '请选择想要操作的任务',
    choices: [{ name: '+ 创建任务', value: '-2' }, ...list.map((task, index) => {
      return { name: `${task.completed ? '[x]' : '[_]'} ${index + 1} - ${task.title}`, value: index.toString() }
    }), { name: '退出', value: '-1' }]
  }).then((answer) => {
    const index = parseInt(answer.index)
    if (index >= 0) {
      console.log('选中了一个任务');
      inquirer.prompt({
        type: 'list',
        name: 'action',
        message: '请选择操作',
        choices: [
          { name: '改标题', value: 'updateTitle' },
          { name: '已完成', value: 'markAsDone' },
          { name: '未完成', value: 'markAsUndone' },
          { name: '删除', value: 'remove' },
          { name: '退出', value: 'exit' },
        ]
      }).then((answer2) => {
        const action = answer2.action
        switch (action) {
          case 'updateTitle':
            inquirer.prompt({
              type: 'input',
              name: 'title',
              message: '请输入新的标题',
              default: list[index].title
            }).then((answer3) => {
              const title = answer3.title
              list[index].title = title
              db.write(list)
            })
            break;
          case 'markAsDone':
            list[index].completed = true
            db.write(list)
            break;
          case 'markAsUndone':
            list[index].completed = false
            db.write(list)
            break;
          case 'remove':
            list.splice(index, 1)
            db.write(list)
            break;
          case 'exit':
            console.log('退出');
        }
      })
    }
    if (index === -1) {
      console.log('退出');
    }
    if (index === -2) {
      console.log('添加任务');
    }
  })
}
