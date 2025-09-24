import type BaseProps from "../../../../../../types/index.ts"
import type { FundingAgency as FundingAgencyProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = FundingAgencyProps & BaseProps

export default function FundingAgency({
	_type = "FundingAgency",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
