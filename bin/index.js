#!/usr/bin/env node

import http from 'http'
import { serverInit } from '../src/main.js'
import { args, shellHelp } from '../src/utils/index.js'

const server = http.createServer(serverInit)

const port = args.p || 0

if (args.h) shellHelp()

const onServerRun = () => {
	console.log(`[${new Date().toLocaleString()}] Node.js Development Server (http://localhost:${server.address().port}) started`)
}

server.listen(port, onServerRun)
