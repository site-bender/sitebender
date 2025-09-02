type ComponentLike =
	& { attributes?: { id?: string }; children?: unknown[] }
	& Record<string, unknown>

const collectConditionals = (component: unknown): Record<string, unknown> => {
	if (!component || typeof component !== "object") return {}
	const comp = component as ComponentLike

	const conditions = Object.entries(comp).reduce(
		(conds: Record<string, unknown>, [key, value]) => {
			if (key === "display" && comp.attributes?.id) {
				conds[comp.attributes.id] = value
			}

			if (key === "children" && Array.isArray(value)) {
				for (const item of value) {
					Object.assign(conds, collectConditionals(item))
				}
			}

			return conds
		},
		{},
	)

	return conditions
}

export default collectConditionals
