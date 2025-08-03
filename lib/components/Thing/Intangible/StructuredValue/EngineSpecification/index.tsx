import type BaseProps from "../../../../../types/index.ts"
import type { EngineSpecification as EngineSpecificationProps } from "../../../../../types/index.ts"

import StructuredValue from "../index.tsx"

export type Props = EngineSpecificationProps & BaseProps

export default function EngineSpecification({
	_type = "EngineSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
