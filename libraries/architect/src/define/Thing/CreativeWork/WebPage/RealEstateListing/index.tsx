import type BaseProps from "../../../../../../types/index.ts"
import type { RealEstateListing as RealEstateListingProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = RealEstateListingProps & BaseProps

export default function RealEstateListing({
	_type = "RealEstateListing",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
