import type BaseProps from "../../../../../types/index.ts"
import type LegislationObjectProps from "../../../../../types/Thing/CreativeWork/Legislation/LegislationObject/index.ts"

import Legislation from "../index.tsx"

export type Props = LegislationObjectProps & BaseProps

export default function LegislationObject({
	legislationLegalValue,
	_type = "LegislationObject",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Legislation
			{...props}
			_type={_type}
			subtypeProperties={{
				legislationLegalValue,
				...subtypeProperties,
			}}
		>{children}</Legislation>
	)
}
