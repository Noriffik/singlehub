/**
 * Created by Derwish (derwish.pro@gmail.com) on 04.07.2016.
 */


import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
// import * as expressValidator from 'express-validator';
let expressValidator = require('express-validator');
import * as http from 'http';

const log = require('logplease').create('server',{color: 3});

import {EditorServerSocket} from "../../routes/editor-server-socket"





let config = require('./../../config.json');

export class Server {
    express: express.Application;
    server: http.Server;
    socket: EditorServerSocket;
    private __rootdirname;

    constructor() {
        this.__rootdirname = (<any>global).__rootdirname;
        this.express = express();
        this.setViewEngine();
        this.middleware();
        this.routes();
        this.handeErrors();
        this.configure();
        this.start_io();
    }

    private setViewEngine() {
        this.express.set('views', path.join(this.__rootdirname, 'views'));
        this.express.set('view engine', 'jade');
    }

    private middleware() {
        // uncomment after placing your favicon in /public
        //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        if (config.webServer.debug)
            this.express.use(morgan('dev',{
            skip: function (req, res) { return res.statusCode < 400 }
        }));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(cookieParser());
        this.express.use(expressValidator());
        this.express.use(require('stylus').middleware(path.join(this.__rootdirname, 'public')));
        this.express.use(express.static(path.join(this.__rootdirname, 'public')));
    }

    private routes() {
        //api console logger
        this.express.use('/api/', function (req, res, next) {
            var send = res.send;
            (<any>res).send = function (body) {
                if (res.statusCode != 200)
                    log.warn(body);
                // else
                // log.debug(body);

                send.call(this, body);
            };
            next();
        });
        this.express.use('/', require('./../../routes/first-run'));
        this.express.use('/', require('./../../routes/index'));
        this.express.use('/dashboard', require('./../../routes/dashboard'));
        this.express.use('/editor', require('./../../routes/editor'));
        this.express.use('/api/editor', require('./../../routes/api-editor'));
        this.express.use('/mysensors', require('./../../routes/mysensors'));
        this.express.use('/api/mysensors', require('./../../routes/api-mysensors'));
    }

    private handeErrors() {
        // // catch 404 and forward to error handler
        // this.express.use(function (req, res, next) {
        //     let err = new Error('Not Found');
        //     (<any>err).status = 404;
        //     next(err);
        // });

        // error handlers
        // development error handler: will print stacktrace
        if (this.express.get('env') === 'development') {
            this.express.use((err: Error & {status: number}, req: express.Request, res: express.Response, next: express.NextFunction): void => {
                log.warn(err);
                res.status(err.status || 500);
                res.render('error', {message: err.message, error: err});
            });
        }

        // production error handler: no stacktraces leaked to user
        this.express.use((err: Error & {status: number}, req: express.Request, res: express.Response, next: express.NextFunction): void => {
            log.warn(err);
            res.status(err.status || 500);
            res.render('error', {message: err.message, error: {}});
        });
    }

    private configure() {

        const port = normalizePort(process.env.PORT || 1312);
        this.express.set('port', port);

        this.server = http.createServer(this.express);
        this.server.listen(port);
        this.server.on('error', onError);
        this.server.on('listening', onListening);

        // let io=socket(this.server);
        //
        //
        //
        // io.on('connection', function(socket){
        //     socket.on('chat message', function(msg){
        //         io.emit('chat message', msg+"2");
        //     });
        // });

        function normalizePort(val: number|string): number|string|boolean {
            let port: number = (typeof (val) === 'string') ? parseInt(val, 10) : val;
            if (isNaN(port)) return val;
            else if (port >= 0) return port;
            else return false;
        }

        var that = this;

        function onError(error: NodeJS.ErrnoException): void {
            if (error.syscall !== 'listen') throw error;
            let bind = (typeof (port) === 'string') ? 'Pipe ' + port : 'Port ' + port;
            switch (error.code) {
                case 'EACCES':
                    console.error(`${bind} requires elevated privileges`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(`${bind} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        }

        function onListening(): void {
            let addr = that.server.address();
            let bind = (typeof (addr) === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
            log.info(`Listening on ${bind}`);
        }
    }

    private start_io() {
        this.socket = new EditorServerSocket(this.server);
    }
}


export let server = new Server();
