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
  *  This server call a callback function whenever a serial message comes in.
  *  The content of the message is given to the callback as parameter number one.
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
var currentLog = "";
function main(params) {
    var currentPort = undefined;
    console.log("Available ports:");
    serialport.list(function (err, ports) {
        ports.forEach(function (port) {
            ports += port.comName + "\n";
            console.log(port.comName);
            if (port.comName === params[2]) {
                currentPort = port;
            }
        });
        console.log("Port " + currentPort.comName + " selected");
        var activeSerialPort = new serialport.SerialPort(currentPort.comName, {
            baudrate: 9600
        });
        activeSerialPort.on("open", function () {
            var comInServer = new ComInServer();
            comInServer.setSerialPort(activeSerialPort);
            comInServer.setCallback(function (data) {
                console.log(data.toString());
                currentLog += data.toString();
            });
        });
    });
}
main(process.argv);
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(currentLog);
}).listen(1337);
