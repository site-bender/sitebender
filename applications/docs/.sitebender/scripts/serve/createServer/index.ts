import { extname, join } from "jsr:@std/path"

import getContentType from "./getContentType/index.ts"

type ServerOptions = {
	port?: number
}

export default function createServer(
	logger: Logger = console,
	options: ServerOptions = {},
): { port: number; stop: () => void } {
	const { port = 3000 } = options

	logger.log(`🚀 Server starting on port ${port}...`)
	logger.log(`📍 http://localhost:${port}`)

	const abortController = new AbortController()

	const handler = async (req: Request): Promise<Response> => {
		const url = new URL(req.url)

		const initialPath = url.pathname
		let filePath = initialPath

		if (filePath === "/") {
			filePath = "/index.html"
		} else if (filePath.endsWith("/") || !extname(filePath)) {
			const cleanPath = filePath.replace(/\/$/, "")
			filePath = `${cleanPath}/index.html`
		}

		const fullPath = join(Deno.cwd(), "dist", filePath)

		try {
			const stat = await Deno.stat(fullPath)
			if (stat.isFile) {
				const file = await Deno.readFile(fullPath)

				const contentType = getContentType(extname(filePath))
				return new Response(file, {
					headers: { "Content-Type": contentType },
				})
			}
		} catch (error) {
			if (!(error instanceof Deno.errors.NotFound)) {
				logger.error("Error serving file:", error)
			}
		}

		return new Response("Not Found", { status: 404 })
	}

	Deno.serve(
		{ port, signal: abortController.signal },
		handler,
	)

	return {
		port,
		stop: () => {
			abortController.abort()
		},
	}
}
