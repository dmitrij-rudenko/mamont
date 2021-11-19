#!/usr/bin/env node

import http from 'http'
import { serverInit } from '../src/main.js'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const server = http.createServer(serverInit)
const argv = yargs(hideBin(process.argv)).argv
const port = argv.p || 0

const onServerRun = () => {
	console.log(`Server running at http://localhost:${server.address().port}/`)
}

server.listen(port, onServerRun)
