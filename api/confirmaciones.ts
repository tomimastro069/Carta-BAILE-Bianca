import type { VercelRequest, VercelResponse } from '@vercel/node'
import { put, get } from '@vercel/blob'

const BLOB_PATH = 'confirmaciones.json'

async function readList(): Promise<unknown[]> {
  try {
    const result = await get(BLOB_PATH, { access: 'private' })
    if (!result || result.statusCode !== 200) return []
    const text = await new Response(result.stream).text()
    if (!text.trim()) return []
    const parsed = JSON.parse(text)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const lista = await readList()
    res.status(200).json(lista)
    return
  }

  if (req.method === 'POST') {
    try {
      const entry = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      const lista = await readList()
      lista.push(entry)
      await put(BLOB_PATH, JSON.stringify(lista, null, 2), {
        access: 'private',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      })
      res.status(201).json({ ok: true })
    } catch {
      res.status(400).json({ ok: false, error: 'invalid body' })
    }
    return
  }

  res.status(405).send('Method not allowed')
}
