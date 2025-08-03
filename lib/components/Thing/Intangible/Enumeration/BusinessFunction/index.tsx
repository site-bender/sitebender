import type BaseProps from "../../../../../types/index.ts"
import type { BusinessFunction as BusinessFunctionProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = BusinessFunctionProps & BaseProps

export default function BusinessFunction({
	_type = "BusinessFunction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
