import type BaseProps from "../../../../types/index.ts"

import Base from "../../Base/index.tsx"

// Keep Event lightweight; allow basic name/description fields used by callers
export type Props = BaseProps & {
	name?: string
	description?: string
	startDate?: string
}

export default function Event({
	_type = "Event",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
