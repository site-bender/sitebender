import type BaseProps from "../../../../../../types/index.ts"
import type { SizeSpecification as SizeSpecificationProps } from "../../../../../../types/index.ts"

import QualitativeValue from "../index.tsx"

export type Props = SizeSpecificationProps & BaseProps

export default function SizeSpecification({
	_type = "SizeSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
