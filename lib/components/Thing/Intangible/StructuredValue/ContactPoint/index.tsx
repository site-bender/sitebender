import type BaseProps from "../../../../../types/index.ts"
import type { ContactPoint as ContactPointProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ContactPointProps & BaseProps

export default function ContactPoint({
	_type = "ContactPoint",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
