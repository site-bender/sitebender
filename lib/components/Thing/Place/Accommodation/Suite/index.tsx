import type BaseProps from "../../../../../types/index.ts"
import type { Suite as SuiteProps } from "../../../../../types/index.ts"

import Accommodation from "../index.tsx"

export type Props = SuiteProps & BaseProps

export default function Suite({
	_type = "Suite",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
