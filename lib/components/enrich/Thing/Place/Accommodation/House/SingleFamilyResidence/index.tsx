import type BaseProps from "../../../../../../types/index.ts"
import type { SingleFamilyResidence as SingleFamilyResidenceProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = SingleFamilyResidenceProps & BaseProps

export default function SingleFamilyResidence({
	_type = "SingleFamilyResidence",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
