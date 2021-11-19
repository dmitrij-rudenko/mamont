import fs from 'fs'

const dir = process.cwd()

export const serverInit = (request, response) => {
	console.log(`Requested adress: ${request.url}`)

	if (request.url === '/') request.url = '/index.html'

	const filePath = dir + '/' + request.url.substr(1).split('?')[0]
	console.log(`Requested file by address: ${filePath}`)

	fs.access(filePath, fs.constants.R_OK, (err) => {
		if (err) {
			response.statusCode = 404
			response.end('Resourse not found!')

			return
		}

		fs.createReadStream(filePath).pipe(response)
	})
}
