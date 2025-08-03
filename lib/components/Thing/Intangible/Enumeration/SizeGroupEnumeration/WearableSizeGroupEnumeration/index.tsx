import type BaseProps from "../../../../../../types/index.ts"
import type { WearableSizeGroupEnumeration as WearableSizeGroupEnumerationProps } from "../../../../../../types/index.ts"

import SizeGroupEnumeration from "../index.tsx"

export type Props = WearableSizeGroupEnumerationProps & BaseProps

export default function WearableSizeGroupEnumeration({
	_type = "WearableSizeGroupEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
