import type BaseProps from "../../../../../types/index.ts"
import type { OwnershipInfo as OwnershipInfoProps } from "../../../../../types/index.ts"

import StructuredValue from "../index.tsx"

export type Props = OwnershipInfoProps & BaseProps

export default function OwnershipInfo({
	_type = "OwnershipInfo",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
