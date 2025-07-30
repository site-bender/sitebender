import type BaseProps from "../../../../../../types/index.ts"
import type PostOfficeProps from "../../../../../../types/Thing/Organization/LocalBusiness/GovernmentOffice/PostOffice/index.ts"

import GovernmentOffice from "../index.tsx"

export type Props = PostOfficeProps & BaseProps

export default function PostOffice({
	_type = "PostOffice",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<GovernmentOffice
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</GovernmentOffice>
	)
}
