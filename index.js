const {
  readers: {
    eos: { NodeosActionReader } 
  },
  watchers: { BaseActionWatcher }, 
  handlers: { 
    mysql: { MysqlActionHandler }
  }
} = require("demux-js-mysql")
const mysql = require('promise-mysql')

const updaters = require('./updaters')
const effects = require('./effects')
const config = require('./config')

async function main () {
    const conn = await mysql.createConnection(config.mysql)
    const actionHandler = new MysqlActionHandler(updaters, effects, conn)
    
    const actionReader = new NodeosActionReader(
        "http://127.0.0.1:8888",
        2985348
    )
    
    const actionWatcher = new BaseActionWatcher(
      actionReader,
      actionHandler,
      250, // Poll at twice the block interval for less latency
    )
    
    actionWatcher.watch()
}

main()
