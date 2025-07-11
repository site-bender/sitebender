import type { JsonObject } from "../../helpers/createJsonLdScript/JsonValue/index.ts"

import createElement from "../../../utilities/createElement/index.ts"
import createJsonLdScript from "../../helpers/createJsonLdScript/index.tsx"

type Props = {
	vesselType?: "ship" | "aircraft" | "spacecraft" | "submarine" | "vehicle"
	designation?: string // Military/official designation
	registry?: string // Registration/hull number
	itemProp?: string // Microdata (schema.org)
	generateJsonLd?: boolean
	children: string
}

export default function VesselName({
	vesselType = "ship",
	designation,
	registry,
	itemProp,
	generateJsonLd = false,
	children,
	...props
}: Props) {
	const jsonLdData: JsonObject | null = generateJsonLd
		? {
			"@context": "https://schema.org",
			"@type": "Vehicle",
			name: children,
			vehicleConfiguration: vesselType,
			...(registry ? { vehicleIdentificationNumber: registry } : {}),
			...(designation ? { model: designation } : {}),
			additionalProperty: [
				...(designation
					? [{
						"@type": "PropertyValue",
						name: "designation",
						value: designation,
					}]
					: []),
				...(registry
					? [{
						"@type": "PropertyValue",
						name: "registry",
						value: registry,
					}]
					: []),
			],
		}
		: null

	return (
		<i
			class={`vessel-name vessel-type-${vesselType}`}
			itemProp={itemProp}
			data-vessel-type={vesselType}
			data-designation={designation}
			data-registry={registry}
			{...props}
		>
			{children}

			{/* JSON-LD */}
			{createJsonLdScript(jsonLdData)}
		</i>
	)
}
