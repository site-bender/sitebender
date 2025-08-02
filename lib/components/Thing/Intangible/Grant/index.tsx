import type BaseProps from "../../../../types/index.ts"
import type GrantProps from "../../../../types/Thing/Intangible/Grant/index.ts"

import Intangible from "../index.tsx"

export type Props = GrantProps & BaseProps

export default function Grant({
	fundedItem,
	funder,
	sponsor,
	_type = "Grant",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				fundedItem,
				funder,
				sponsor,
				...subtypeProperties,
			}}
		>
			{children}
		</Intangible>
	)
}
