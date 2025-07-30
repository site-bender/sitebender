import type BaseProps from "../../../../../types/index.ts"
import type CrematoriumProps from "../../../../../types/Thing/Place/CivicStructure/Crematorium/index.ts"

import CivicStructure from "../index.tsx"

export type Props = CrematoriumProps & BaseProps

export default function Crematorium({
	_type = "Crematorium",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CivicStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</CivicStructure>
	)
}
