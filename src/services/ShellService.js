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
		this.argv.h && this.#logHelp()
	}

	static async initSiteClone() {
		if (this.argv.c) {
			const { origin, host, href } = getUrlData(this.argv.c)
			const url = origin

			try {
				const { data } = await axios.get(url)
				const $ = cheerio.load(data);
				
				const getUrlsList = (tag, attr) => {
					const $tags = $(tag)
					const resultList = []
					$tags.each(function(index) {
						let link = $(this).attr(attr)
						
						if (link && link.startsWith('/')) link = link.replace('/', href)
						$(this).attr(attr, link)

						resultList.push({
							attributes: JSON.parse(JSON.stringify($tags[index].attribs))
						})
					})

					return resultList
				}

				const scriptSourceList = getUrlsList('script', 'src')
				const imagesSourceList = getUrlsList('img', 'src')
				const linkHrefList = getUrlsList('link', 'href')
				
				if (!fs.existsSync(host)) await fs.promises.mkdir(host)
				fs.writeFile(host + '/index.html', $.html(), error => {
					error && console.log(error)
				})
			} catch (err) {
				console.log(err.message)
			}

		}
	}
}
