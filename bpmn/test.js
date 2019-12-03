const { ZBClient } = require('zeebe-node')

const zbc = new ZBClient()

zbc.deployWorkflow('./test-message.bpmn').then(res => {
  console.log(res)
  zbc
    .createWorkflowInstance('test-message', {
      name: 'World!',
    })
    .then(console.log)
})
