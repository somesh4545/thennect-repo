import React from 'react';
import io from 'socket.io-client';

// export const socket = io('http://localhost:5000/');
export const socket = io('https://radiant-plateau-59096.herokuapp.com');

export const SocketContext = React.createContext();
