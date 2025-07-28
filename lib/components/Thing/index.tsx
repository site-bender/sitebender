import type Props from "../../types/Thing/index.ts"
import type BaseProps from "../../types/index.ts"

import Base from "../Base/index.tsx"

export default function Thing({
		additionalType,
		alternateName,
		description,
		disambiguatingDescription,
		identifier,
		image,
		mainEntityOfPage,
		name,
		potentialAction,
		sameAs,
		schemaType = "Thing",
		subjectOf,
		subtypeProperties = {},
		url,
		...props
	}: Props & BaseProps): JSX.Element {
		const allProps = {
			...props,
			schemaType,
			subtypeProperties: {
				additionalType,
				alternateName,
				description,
				disambiguatingDescription,
				identifier,
				image,
				mainEntityOfPage,
				name,
				potentialAction,
				sameAs,
				subjectOf,
				url,
				...subtypeProperties, // Merge any additional properties
			},
		}

	return (
		<Base {...allProps} />
	)
}
