import type BaseProps from "../../../../types/index.ts"
import type LibrarySystemProps from "../../../../types/Thing/Organization/LibrarySystem/index.ts"

import Organization from "../index.tsx"

export type Props = LibrarySystemProps & BaseProps

export default function LibrarySystem({
	_type = "LibrarySystem",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Organization
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</Organization>
	)
}
