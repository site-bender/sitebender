import type BaseProps from "../../../types/schema.org/index.ts"
import type ThingProps from "../../../types/schema.org/Thing/index.ts"

import Base from "../Base/index.tsx"

type Props = ThingProps & BaseProps

export default function Thing({
	_type = "Thing",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
