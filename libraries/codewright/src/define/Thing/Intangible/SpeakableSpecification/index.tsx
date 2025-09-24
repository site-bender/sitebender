import type BaseProps from "../../../../../types/index.ts"
import type { SpeakableSpecification as SpeakableSpecificationProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = SpeakableSpecificationProps & BaseProps

export default function SpeakableSpecification({
	_type = "SpeakableSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
