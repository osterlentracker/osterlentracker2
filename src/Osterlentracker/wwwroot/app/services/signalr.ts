import $ from 'jquery';
import 'ms-signalr-client';

class Signalr {
    connection: any;
    hubs = {};

    constructor() {
        this.connection = $.hubConnection("/signalr", { useDefaultPath: false });

        this.connection.disconnected(() => this.onDisconnect());
    }

    onDisconnect() {
        setTimeout(() => {
            console.info("Reconnecting...");
            this.connection.start(() => {
                console.info("Connected.");
            });
        }, 5000); // Restart connection after 5 seconds.

        console.info("Reconnecting in 5 sec...");
    }

    connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.start({ jsonp: true })
                .done(() => {
                    console.info("Connected.");
                    resolve();
                }).fail(error => {
                    reject(error);
                });
        });
    }

    disconnect(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connection.end()
                .done(() => {
                    console.info("Disconnected.");
                    resolve();
                }).fail(error => {
                    reject(error);
                });
        });
    }

    getHubProxy(hubName) {
        let hub = null;
        if (hubName in this.hubs) {
            hub = this.hubs[hubName];
        } else {
            let h = this.connection.createHubProxy(hubName);
            h.logging = true;
            hub = new Hub(h);
                
            this.hubs[hubName] = hub;
        }
        return hub;
    }
}

export class Hub {
    hub: any;

    constructor(hub) {
        this.hub = hub;
    }

    invoke(method: string, arg) {
        let _this = this;
        return new Promise((resolve, reject) => {
            _this.hub.invoke(method, arg);
        });
    }

    on(event: string, handler: () => void) {
        this.hub.on(event, handler);
    }

    addListener(event: string, handler: () => void) {
        this.hub.on(event, handler);
    }

    removeListener(event: string, handler: () => void) {
        this.hub.off(event, handler);
    }
}

export default new Signalr();