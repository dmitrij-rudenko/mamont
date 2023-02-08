import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { HELP_TEXT } from '../constants/index.js'
import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs'
import { getUrlData } from '../utils/index.js'

export class ShellService {
	static argv = yargs(hideBin(process.argv)).argv
	static port = (() => this.argv.p || 0)()

	static #logHelp() {
		console.log(HELP_TEXT)
		process.exit(0)
	}

	static initHelp() {
		if (this.argv.h) {
			this.#logHelp()
		}
	}

	static async initSiteClone() {
		if (this.argv.c) {
			const { origin, host } = getUrlData(this.argv.c)

			try {
				const { data } = await axios.get(origin)
				const $ = cheerio.load(data)

				if (!fs.existsSync(host)) {
					await fs.promises.mkdir(host)
				}
				fs.writeFile(host + '/index.html', $.html(), (error) => {
					if (error) {
						console.log(error)
					}
				})
			} catch (err) {
				console.log(err.message)
			}
		}
	}
}
