import type { Country } from "../../../../../../../types/components/forms/index.ts"

export default function byCountryName(a: Country, b: Country): number {
	return a.name.localeCompare(b.name)
}
