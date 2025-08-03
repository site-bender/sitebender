import type BaseProps from "../../../../../types/index.ts"
import type { Joint as JointProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = JointProps & BaseProps

export default function Joint({
	_type = "Joint",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
