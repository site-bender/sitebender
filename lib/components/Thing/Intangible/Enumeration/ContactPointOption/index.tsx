import type BaseProps from "../../../../../types/index.ts"
import type { ContactPointOption as ContactPointOptionProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = ContactPointOptionProps & BaseProps

export default function ContactPointOption({
	_type = "ContactPointOption",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
