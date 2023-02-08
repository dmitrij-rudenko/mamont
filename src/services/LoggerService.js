import chalk from 'chalk'

import { colors } from '../constants/index.js'

export class LoggerService {
	static #getDate = () => new Date().toLocaleString()

	static #getColor = (statusCode) =>
		statusCode === 200 ? colors.SUCCESS : colors.ERROR

	static initMessage(port) {
		console.log(
			`[${this.#getDate()}] Node.js Development Server (http://localhost:${port}) started`
		)
	}

	static getMessage(text, host, statusCode) {
		console.log(`[${this.#getDate()}] ${host} [${statusCode}] ${text}`)
	}

	static logger(statusCode, filePath, host) {
		const color = this.#getColor(statusCode)

		this.getMessage(chalk[color](`${filePath}`), host, statusCode)
	}
}
