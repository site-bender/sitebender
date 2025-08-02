import type BaseProps from "../../../../../types/index.ts"
import type ContactPointOptionProps from "../../../../../types/Thing/Intangible/Enumeration/ContactPointOption/index.ts"

import Enumeration from "../index.tsx"

export type Props = ContactPointOptionProps & BaseProps

export default function ContactPointOption({
	_type = "ContactPointOption",
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
