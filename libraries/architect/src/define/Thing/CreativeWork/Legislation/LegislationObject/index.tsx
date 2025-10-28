import type BaseProps from "../../../../../../types/index.ts"
import type { LegislationObject as LegislationObjectProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = LegislationObjectProps & BaseProps

export default function LegislationObject({
	_type = "LegislationObject",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
