import type BaseProps from "../../../../../../../types/index.ts"
import type { Courthouse as CourthouseProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = CourthouseProps & BaseProps

export default function Courthouse({
	_type = "Courthouse",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
