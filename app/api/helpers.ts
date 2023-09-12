export function generateRandomString(length: number): string {
  let text = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export function encodeAsBase64(text: string): string {
  const bufferValue = Buffer.from(text)
  const encodedValue = bufferValue.toString("base64")
  return encodedValue
}
