import type BaseProps from "../../../../../types/index.ts"
import type PlaygroundProps from "../../../../../types/Thing/Place/CivicStructure/Playground/index.ts"

import CivicStructure from "../index.tsx"

export type Props = PlaygroundProps & BaseProps

export default function Playground({
	_type = "Playground",
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
