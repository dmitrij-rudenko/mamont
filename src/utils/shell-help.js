export const shellHelp = () => {
	const helpMessage = `
  █▀▄▀█ ▄▀█ █▀▄▀█ █▀█ █▄░█ ▀█▀
  █░▀░█ █▀█ █░▀░█ █▄█ █░▀█ ░█░

  Simple development server on Node.js

  usage:
    mamont

  options:
    -p	Make the web server accessible from the port you specified
    -t	Starting with a specific document root directory
    -h	Show help

  example:
    mamont -p 3000
  `

	console.log(helpMessage)
	process.exit(0)
}
