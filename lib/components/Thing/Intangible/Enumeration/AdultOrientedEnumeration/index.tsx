import type BaseProps from "../../../../../types/index.ts"
import type { AdultOrientedEnumeration as AdultOrientedEnumerationProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = AdultOrientedEnumerationProps & BaseProps

export default function AdultOrientedEnumeration({
	_type = "AdultOrientedEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
