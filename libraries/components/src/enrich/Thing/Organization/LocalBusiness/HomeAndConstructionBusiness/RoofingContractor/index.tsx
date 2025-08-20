import type BaseProps from "../../../../../../types/index.ts"
import type { RoofingContractor as RoofingContractorProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = RoofingContractorProps & BaseProps

export default function RoofingContractor({
	_type = "RoofingContractor",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
