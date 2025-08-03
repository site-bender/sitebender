import type BaseProps from "../../../../../types/index.ts"
import type { Nerve as NerveProps } from "../../../../../types/index.ts"

import AnatomicalStructure from "../index.tsx"

export type Props = NerveProps & BaseProps

export default function Nerve({
	_type = "Nerve",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
