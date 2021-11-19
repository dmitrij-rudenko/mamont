#!/usr/bin/env node

import http from 'http'
import { serverInit } from '../src/main.js'
import { args } from '../src/utils/index.js'

const server = http.createServer(serverInit)

const port = args.p || 0

const helpMessage = `
█▀▄▀█ ▄▀█ █▀▄▀█ █▀█ █▄░█ ▀█▀
█░▀░█ █▀█ █░▀░█ █▄█ █░▀█ ░█░

Simple development server on Node.js

usage:
	mamont -p 3000 -t dist

options:
	-p	Make the web server accessible from the port you specified
	-t	Starting with a specific document root directory
	-h	Show help
`

if (args.h) {
	console.log(helpMessage)

	process.exit(0)
}

const onServerRun = () => {
	console.log(`[${new Date().toLocaleString()}] Node.js Development Server (http://localhost:${server.address().port}) started`)
}

server.listen(port, onServerRun)
