import type BaseProps from "../../../../../../../types/index.ts"
import type { Plumber as PlumberProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = PlumberProps & BaseProps

export default function Plumber({
	_type = "Plumber",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
