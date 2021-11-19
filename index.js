const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((request, response) => {
	console.log(`Запрошенный адрес: ${request.url}`);
	// получаем путь после слеша

  if (request.url === '/') {
    request.url = '/index.html';
  }
	const filePath = '.temp/' + request.url.substr(1);
	// смотрим, есть ли такой файл
	fs.access(filePath, fs.constants.R_OK, (err) => {
		// если произошла ошибка - отправляем статусный код 404
		if (err) {
			response.statusCode = 404;
			response.end("Resourse not found!");
      return 
		}
    fs.createReadStream(filePath).pipe(response);
	});
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
