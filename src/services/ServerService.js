import http from 'http'
import fs from 'fs'
import { ShellService } from './ShellService.js'
import { LoggerService } from './LoggerService.js'
import { getUrlData } from '../utils/index.js'

const argv = ShellService.argv
let dir = argv.d || process.cwd()

export class ServerService {
	static #urlData = null

	static #redirectToIndexPage(request) {
		this.#urlData = getUrlData(argv.c || request.url)

		const url = request.url.substr(1).split('?')[0]
		if (url === '/' || url === '') {
			request.url = '/index.html'
		}
	}

	static #initFileAccess = ({ host, url, response }) => {
		if (argv.c) {
			dir = this.#urlData.host
		}

		const filePath = dir + '/' + url.substr(1).split('?')[0]

		const onFileAccess = (err) => {
			if (!fs.existsSync(filePath)) err = true
			if (err) response.statusCode = 404

			LoggerService.logger(response.statusCode, filePath, host)

			if (err) {
				response.end('Resourse not found!')

				return
			}

			fs.createReadStream(filePath).pipe(response)
		}

		fs.access(filePath, fs.constants.R_OK, onFileAccess)
	}

	static #responseStaticFiles = (request, response) => {
		const {
			url,
			headers: { host },
		} = request

		LoggerService.getMessage(`${url}`, host, response.statusCode)
		this.#initFileAccess({ host, url, response })
	}

	static #serverInit = (request, response) => {
		this.#redirectToIndexPage(request)
		this.#responseStaticFiles(request, response)
	}

	static #onListen() {
		this.serverPort = ServerService.server.address().port
		LoggerService.initMessage(this.serverPort)
	}

	static async init() {
		ShellService.initHelp()
		await ShellService.initSiteClone()

		this.server.listen(ShellService.port, this.#onListen)
	}

	static server = http.createServer(this.#serverInit)
	static serverPort = null
}
