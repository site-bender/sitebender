import Error from "../../constructors/Error/index.ts"
import getFromLocal from "@adaptiveSrc/pending/dom/getValue/getFromLocal/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

// deno-lint-ignore no-explicit-any
const fromApi = (op: any = {}) => async (_: unknown, localValues?: Record<string, unknown>) => {
	const { method = "GET", url, options = {} } = op as { method?: string; url: string; options?: RequestInit }

	const local = getFromLocal(op)(localValues)

	if (isDefined(local)) {
		return local
	}

	try {
		const resp = await fetch(url, { method, ...options })

		const json = await resp.json()

		return { right: json }
	} catch (e: unknown) {
		const maybe = e as { message?: unknown }
		const msg = typeof maybe.message === "string" ? maybe.message : String(e)
		return { left: [Error("FromApi")("FromApi")(msg)] }
	}
}

export default fromApi
