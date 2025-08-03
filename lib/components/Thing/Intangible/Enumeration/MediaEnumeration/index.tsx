import type BaseProps from "../../../../../types/index.ts"
import type { MediaEnumeration as MediaEnumerationProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = MediaEnumerationProps & BaseProps

export default function MediaEnumeration({
	_type = "MediaEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
