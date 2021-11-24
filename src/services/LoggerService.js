import chalk from 'chalk'

import { ShellService } from './ShellService.js'
import { SUCCESS_COLOR, ERROR_COLOR } from '../constants/index.js'

export class LoggerService {
	static #getDate = () => new Date().toLocaleString()

	static #getColor = (statusCode) =>
		statusCode === 200 ? SUCCESS_COLOR : ERROR_COLOR

	static initMessage() {
		console.log(
			`[${this.#getDate()}] Node.js Development Server (http://localhost:${
				ShellService.port
			}) started`
		)
	}
	static getMessage(text, host, statusCode) {
		console.log(`[${this.#getDate()}] ${host} [${statusCode}] ${text}`)
	}

	static logger(statusCode, filePath, host) {
		this.getMessage(
			chalk[this.#getColor(statusCode)](`${filePath}`),
			host,
			statusCode
		)
	}
}
