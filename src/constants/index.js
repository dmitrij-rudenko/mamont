export const HELP_TEXT = `
█▀▄▀█ ▄▀█ █▀▄▀█ █▀█ █▄░█ ▀█▀
█░▀░█ █▀█ █░▀░█ █▄█ █░▀█ ░█░

A simple сommand-line http server for static websites

usage:
  mamont

options:
  -p	Make the web server accessible from the port you specified
  -d	Starting with a specific document root directory
  -h	Show help
  -c  Clone page by url(Create directory with page host name and download page like index.html)

example:
  mamont -p 3000 -c github.com
`

export const SUCCESS_COLOR = 'green'
export const ERROR_COLOR = 'yellow'
