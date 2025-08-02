import type BaseProps from "../../../../types/index.ts"
import type CivicStructureProps from "../../../../types/Thing/Place/CivicStructure/index.ts"

import Place from "../index.tsx"

export type Props = CivicStructureProps & BaseProps

export default function CivicStructure({
	openingHours,
	_type = "CivicStructure",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Place
			{...props}
			_type={_type}
			subtypeProperties={{
				openingHours,
				...subtypeProperties,
			}}
		>
			{children}
		</Place>
	)
}
