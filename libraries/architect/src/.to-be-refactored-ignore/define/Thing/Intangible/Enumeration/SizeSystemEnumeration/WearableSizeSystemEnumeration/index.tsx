import type BaseProps from "../../../../../../../types/index.ts"
import type { WearableSizeSystemEnumeration as WearableSizeSystemEnumerationProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = WearableSizeSystemEnumerationProps & BaseProps

export default function WearableSizeSystemEnumeration({
	_type = "WearableSizeSystemEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
