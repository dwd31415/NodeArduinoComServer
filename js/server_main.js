/*****************************
 * Main Entry point to 		 *
 * Node.js server			 *
 *****************************/
//Include type defs:
/// <reference path="../typings/node/node.d.ts" />
//Include libraries:
var serialport = require("serialport");
var http = require("http");
var socketio = require('socket.io');
/**
  * A server, that sends all messages it recives over a serial port, to a callback function.
 **/
var ComInServer = (function () {
    function ComInServer() {
        ComInServer.currentInstance = this;
    }
    ComInServer.prototype.setCallback = function (newCallback) {
        this.callback = newCallback;
    };
    ComInServer.prototype.setSerialPort = function (serialPort) {
        this.serialPort = serialPort;
        this.serialPort.on('data', function (data) {
            ComInServer.currentInstance.callback(data);
        });
    };
    return ComInServer;
})();
;
function main(params) {
    var currentPort = undefined;
    serialport.list(function (err, ports) {
        ports.forEach(function (port) {
            console.log(port);
            ports += port.comName + "\n";
            console.log(port.comName);
            if (port.comName === params[2]) {
                currentPort = port;
            }
        });
        var activeSerialPort = new serialport.SerialPort(currentPort.comName, {
            baudrate: 9600
        });
        activeSerialPort.on("open", function () {
            var comInServer = new ComInServer();
            comInServer.setSerialPort(activeSerialPort);
            comInServer.setCallback(function (data) {
                console.log("" + data);
            });
        });
    });
}
main(process.argv);
