import type BaseProps from "../../../../../../types/index.ts"
import type ChurchProps from "../../../../../../types/Thing/Place/CivicStructure/PlaceOfWorship/Church/index.ts"

import PlaceOfWorship from "../index.tsx"

export type Props = ChurchProps & BaseProps

export default function Church({
	_type = "Church",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PlaceOfWorship
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</PlaceOfWorship>
	)
}
