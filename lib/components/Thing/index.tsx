import type BaseProps from "../../types/index.ts"
import type { ComponentType } from "../../types/JSX/index.ts"
import type Props from "../../types/Thing/index.ts"

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
	_type = "Thing",
	subjectOf,
	children,
	subtypeProperties = {},
	url,
	...props
}: Props & BaseProps): JSX.Element {
	const allProps = {
		...props,
		_type,
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

	const B = Base as ComponentType<BaseProps>

	return <B {...allProps}>{children}</B>
}
