const WebSocket = require('ws');

class Okex {
    constructor() {
        this.websocketUri = 'wss://real.okex.com:10441/websocket';
        this.connect();
    }

    connect() {
        this.socket = new WebSocket(this.websocketUri);
        this.socket.on('open', () => {
            console.log(`Connected to OKEx websocket!`);
        });
    }

    addSubscriptionDepth(pair_names) {
        this.addSubscription(pair_names, 'depth')
    }

    addSubscriptionTicker(pair_names) {
        this.addSubscription(pair_names, 'ticker')
    }

    addSubscriptionDeals(pair_names) {
        this.addSubscription(pair_names, 'deals')
    }

    addSubscriptionKline(pair_names, kline) {
        //1min, 3min, 5min, 15min, 30min, 1hour, 2hour, 4hour, 6hour, 12hour, day, 3day, week
        this.addSubscription(pair_names, 'kline_'+kline)
    }

    addSubscription(pair_names, type) {
        if (type.indexOf('depth') != -1 || type == 'ticker' || type == 'deals' || type.indexOf('kline') != -1) {
            if (this.socket.readyState != this.socket.OPEN) {
                this.connect();
            }
            this.socket.on('open', () => {
                for (var i = 0; i < pair_names.length; i++) {
                    var pair_name = pair_names[i].replace('/', '_').toLowerCase();
                    var subscription = {
                        event: 'addChannel',
                        channel: 'ok_sub_spot_' + pair_name + '_' + type
                    }
                    this.socket.send(JSON.stringify(subscription))
                }
            });
        }
    }

    terminate() {
        if (this.socket.readyState == this.socket.OPEN && this.socket.readyState != this.socket.CONNECTING) {
            this.socket.terminate();
        }
    }

    onMessage(callback) {
        this.socket.on('message', data => {
            if (typeof callback === 'function') {
                return callback(JSON.parse(data))
            }
            ;
        });
        this.reconnect(callback);
    }

    reconnect(callback) {
        this.socket.on('close', () => {
            console.log('OKEx socket closed!');
            console.log('Reconnecting to OKEx socket....');
            setTimeout(() => {
                this.connect();
                this.onMessage(callback);
            }, 3000);
        });
    }
}

module.exports = Okex