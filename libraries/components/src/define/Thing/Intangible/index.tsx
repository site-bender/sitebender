import type BaseProps from "../../../../types/index.ts"

import Base from "../../Base/index.tsx"

export type Props = BaseProps

export default function Intangible({
	_type = "Intangible",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
