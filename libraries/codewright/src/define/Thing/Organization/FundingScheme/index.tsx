import type BaseProps from "../../../../../types/index.ts"
import type { FundingScheme as FundingSchemeProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = FundingSchemeProps & BaseProps

export default function FundingScheme({
	_type = "FundingScheme",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
