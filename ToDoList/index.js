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


/**
 * 将列表中指定位置的项标记为已完成
 * @param {Array} list - 待标记的列表
 * @param {number} index - 待标记的项的索引
 */
function markAsDone(list, index) {
  list[index].completed = true
  db.write(list)
}

/**
 * 将列表中指定位置的事项标记为未完成
 * @param {Array} list - 包含待处理事项的列表
 * @param {Number} index - 待处理事项在列表中的索引位置
 */
function markAsUndone(list, index) {
  list[index].completed = false
  db.write(list)
}

/**
 * 删除列表中的元素
 *
 * @param {Array} list - 要删除元素的列表
 * @param {number} index - 要删除的元素的索引值
 */
function remove(list, index) {
  list.splice(index, 1)
  db.write(list)
}

/**
 * 更新列表中指定索引的标题
 * @param {Array} list - 包含标题的列表
 * @param {number} index - 需要更新标题的索引
 */
function updateTitle(list, index) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: '请输入新的标题',
    default: list[index].title
  }).then((answer) => {
    const title = answer.title
    list[index].title = title
    db.write(list)
  })
}
function exit() { }

function askForAction(list, index) {
  const actions = { updateTitle, markAsDone, markAsUndone, remove }
  const choices = [
    { name: '改标题', value: 'updateTitle' },
    { name: '已完成', value: 'markAsDone' },
    { name: '未完成', value: 'markAsUndone' },
    { name: '删除', value: 'remove' },
    { name: '退出', value: 'exit' }
  ]
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: '请选择操作',
    choices
  }).then((answer) => {
    const action = actions[answer.action]
    action && action(list, index)
  })
}

/**
 * 打印任务选择列表并接受用户选择
 * @param {Array} list - 任务列表
 */
function askForCreateTasks(list) {
  // 通过inquirer库的prompt方法，向用户提问
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: '请输入任务标题',
  }).then((answer) => {
    // 将用户输入的标题以及未完成的状态，以对象形式添加到列表中
    list.push({ title: answer.title, completed: false })
    // 将更新后的列表写入数据库
    db.write(list)
  })
}

/**
 * 打印待办事项列表并允许用户选择操作
 * @param {Array} list - 待办事项列表
 */
function printTasks(list) {
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
      askForAction(list, index)
    }
    if (index === -1) {
      console.log('退出');
    }
    if (index === -2) {
      askForCreateTasks(list)
    }
  })
}

// 展示所有任务
module.exports.showAll = async () => {
  const list = await db.read()
  printTasks(list)
}
