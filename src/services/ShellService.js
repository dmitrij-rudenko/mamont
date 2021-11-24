import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { HELP_TEXT } from '../constants/index.js'

export class ShellService {
	static argv = yargs(hideBin(process.argv)).argv
	static port = (() => this.argv.p || 0)()

	static #logHelp() {
		console.log(HELP_TEXT)
		process.exit(0)
	}

	static initHelp() {
		this.argv.h && this.#logHelp()
	}
}
