import type BaseProps from "../../../../../../../types/index.ts"
import type { AutoWash as AutoWashProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AutoWashProps & BaseProps

export default function AutoWash({
	_type = "AutoWash",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
