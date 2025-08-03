import type BaseProps from "../../../../types/index.ts"
import type { BroadcastFrequencySpecification as BroadcastFrequencySpecificationProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = BroadcastFrequencySpecificationProps & BaseProps

export default function BroadcastFrequencySpecification({
	_type = "BroadcastFrequencySpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
