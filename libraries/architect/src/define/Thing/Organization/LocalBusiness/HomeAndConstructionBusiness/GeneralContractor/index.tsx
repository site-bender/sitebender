import type BaseProps from "../../../../../../../types/index.ts"
import type { GeneralContractor as GeneralContractorProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = GeneralContractorProps & BaseProps

export default function GeneralContractor({
	_type = "GeneralContractor",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
