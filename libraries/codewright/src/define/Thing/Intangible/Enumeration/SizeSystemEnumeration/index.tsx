import type BaseProps from "../../../../../../types/index.ts"
import type { SizeSystemEnumeration as SizeSystemEnumerationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = SizeSystemEnumerationProps & BaseProps

export default function SizeSystemEnumeration({
	_type = "SizeSystemEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
