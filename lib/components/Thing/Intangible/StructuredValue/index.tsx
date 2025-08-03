import type BaseProps from "../../../../types/index.ts"
import type { StructuredValue as StructuredValueProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = StructuredValueProps & BaseProps

export default function StructuredValue({
	_type = "StructuredValue",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
