import type BaseProps from "../../../../types/index.ts"

import Base from "../../Base/index.tsx"

// Minimal props needed by callers without pulling in the heavy CreativeWork union
export type Props = BaseProps & {
	text?: string
	name?: string
	description?: string
}

export default function CreativeWork({
	_type = "CreativeWork",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
