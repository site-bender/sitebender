import type BaseProps from "../../../../types/index.ts"
import type { HowTo as HowToProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = HowToProps & BaseProps

export default function HowTo({
	_type = "HowTo",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
