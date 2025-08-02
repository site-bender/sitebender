import type BaseProps from "../../../../../types/index.ts"
import type RsvpResponseTypeProps from "../../../../../types/Thing/Intangible/Enumeration/RsvpResponseType/index.ts"

import Enumeration from "../index.tsx"

export type Props = RsvpResponseTypeProps & BaseProps

export default function RsvpResponseType({
	_type = "RsvpResponseType",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Enumeration>
	)
}
