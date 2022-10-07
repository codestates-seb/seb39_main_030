import { io } from 'socket.io-client';

class Socket {
  private io: any;
  constructor(url) {
    this.io = io(url);
  }
}

const Singleton = {
  instance: null,

  getInstance(_param) {
    if (!this.instance) this.instance = new Socket(_param);
    return this.instance;
  },
};

const singleInstance = Singleton.getInstance('https://team30.kro.kr:8080');
export const socket = singleInstance.io;
