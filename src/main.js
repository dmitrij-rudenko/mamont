import fs from 'fs'
import { args, getMessage } from './utils/index.js'
import chalk from 'chalk'

const dir =  args.t || process.cwd()


export const serverInit = (request, response) => {
	const { host } = request.headers
	getMessage(`${request.url}`, host, response.statusCode)

	if (request.url === '/') request.url = '/index.html'

	const filePath = dir + '/' + request.url.substr(1).split('?')[0]

	fs.access(filePath, fs.constants.R_OK, (err) => {
		if (err) response.statusCode = 404
		
		const color = response.statusCode === 200 ? 'green' : 'yellow'
		
		getMessage(chalk[color](`${filePath}`), host, response.statusCode)
		
		if (err) { return response.end('Resourse not found!') }
		
		fs.createReadStream(filePath).pipe(response)
	})
}
