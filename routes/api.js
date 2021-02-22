const express = require('express');
const app = express();
let router = express.Router();

const messagesQueue = {}

router.post('/:queue_name', function (req, res) {
  const queue_name =  req.params.queue_name

  if (!messagesQueue[queue_name]) {
    messagesQueue[queue_name] = []
  }
  messagesQueue[queue_name].push(req.body)
  res.end(JSON.stringify(messagesQueue))
})

router.get('/:queue_name', function (req, res) {
  const timeout = req.query.timeout ? req.query.timeout : 10000
  const queue_name =  req.params.queue_name
  let found = false

  const interval = setInterval(() => {
    if(messagesQueue[queue_name] && messagesQueue[queue_name].length > 0){
      const messageToReturn = messagesQueue[queue_name][0]
      messagesQueue[queue_name].shift()
      found = true
      res.end(JSON.stringify(messageToReturn))
    }
  }, 1000);


  setTimeout(() => {
    if(!found){
      res.status(204).send('Sorry, we cannot find that!');
    }
    clearInterval(interval);
  }, timeout);
})

module.exports = router
