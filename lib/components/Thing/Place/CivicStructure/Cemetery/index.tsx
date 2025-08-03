import type BaseProps from "../../../../../types/index.ts"
import type { Cemetery as CemeteryProps } from "../../../../../types/index.ts"

import CivicStructure from "../index.tsx"

export type Props = CemeteryProps & BaseProps

export default function Cemetery({
	_type = "Cemetery",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
