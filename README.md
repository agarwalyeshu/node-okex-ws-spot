# node-okex-ws

Small library to get updates from OKEX spot web sockets.

# Install:
```
npm install --save node-okex-ws
```

# Usage:

```javascript
const okexSocket = new Okex();

var pairs = ['BCH/BTC','LTC/BTC','LTC/USDT','LTC/ETH'];

//Subscribe pairs ticker
okexSocket.addSubscriptionTicker(pairs);

//Subscribe pairs deals
okexSocket.addSubscriptionDeals(pairs);

//Subscribe pairs depth
okexSocket.addSubscriptionDepth(pairs);

//Subscribe pairs K-line
//K-line time period, such as 1min, 3min, 5min, 15min, 30min, 1hour, 2hour, 4hour, 6hour, 12hour, day, 3day, week
okexSocket.addSubscriptionKline(pairs,'30min');

//to terminate the socket and all the subscription
okexSocket.terminate();

okexSocket.onMessage(data => {
    console.log(data[0]['data']);
});
```
Take a look in examples.

# Todo.
Add authenticate endpoints.

# Disclaimer.
Use it at your own risk.
