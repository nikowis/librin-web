import SockJS from "sockjs-client"
import {Stomp} from "@stomp/stompjs"
import {store} from '../index';

class Websocket {

    constructor() {
        this.API_URL = process.env.REACT_APP_API_URL;
        this.stompClient = null;
    }

    connectAndSubscribe(conversationUpdateCallback) {
        var socket = new SockJS(this.API_URL + '/ws');
        this.stompClient = Stomp.over(socket);
        var headers = {};
        const self = this;
        headers['token'] = store.getState().me.authToken;
        self.stompClient.connect(headers, function (frame) {
            console.log('Connected: ' + frame);
            self.stompClient.subscribe('/users/queue/conversation/{convId}', function (message) {
                console.log("RECEIVED MESSAGE");
                console.log(JSON.parse(message.body).content);
            });
        });
    }
}

export default Websocket = new Websocket();