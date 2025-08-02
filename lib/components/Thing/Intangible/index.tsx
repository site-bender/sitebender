import type BaseProps from "../../../types/index.ts"
import type IntangibleProps from "../../../types/Thing/Intangible/index.ts"

import Thing from "../index.tsx"

export type Props = IntangibleProps & BaseProps

export default function Intangible({
	_type = "Intangible",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Thing
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Thing>
	)
}
