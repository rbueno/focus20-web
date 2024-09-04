import crypto from 'crypto'

const key = process.env.ENCRYPTION_KEY

type EncryptInput = Record<string, any> | string
type EncryptOutput = {
    iv: string,
    data: string
}
export function encrypt(input: EncryptInput): EncryptOutput | undefined {
  const toEncrypt = typeof input === 'string' ? input : JSON.stringify(input)
  if (!toEncrypt || !key) return

  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv)
  let encrypted = cipher.update(toEncrypt)
  encrypted = Buffer.concat([encrypted, cipher.final()])

  return {
    iv: iv.toString('hex'),
    data: encrypted.toString('hex')
  }
}