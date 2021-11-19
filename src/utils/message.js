export const getMessage = (text, host, statusCode) => {
  console.log(`[${new Date().toLocaleString()}] ${host} [${statusCode}] ${text}`)
}