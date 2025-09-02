import type BaseProps from "../../../../../../types/index.ts"
import type { DigitalPlatformEnumeration as DigitalPlatformEnumerationProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = DigitalPlatformEnumerationProps & BaseProps

export default function DigitalPlatformEnumeration({
	_type = "DigitalPlatformEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
