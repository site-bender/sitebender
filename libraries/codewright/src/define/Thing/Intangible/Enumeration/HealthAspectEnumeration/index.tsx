import type BaseProps from "../../../../../../types/index.ts"
import type { HealthAspectEnumeration as HealthAspectEnumerationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = HealthAspectEnumerationProps & BaseProps

export default function HealthAspectEnumeration({
	_type = "HealthAspectEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
