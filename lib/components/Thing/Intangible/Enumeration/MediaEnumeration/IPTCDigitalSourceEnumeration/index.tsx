import type BaseProps from "../../../../../../types/index.ts"
import type { IPTCDigitalSourceEnumeration as IPTCDigitalSourceEnumerationProps } from "../../../../../../types/index.ts"

import MediaEnumeration from "../index.tsx"

export type Props = IPTCDigitalSourceEnumerationProps & BaseProps

export default function IPTCDigitalSourceEnumeration({
	_type = "IPTCDigitalSourceEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
