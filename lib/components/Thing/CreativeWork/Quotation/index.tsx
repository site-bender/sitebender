import type BaseProps from "../../../../types/index.ts"
import type QuotationProps from "../../../../types/Thing/CreativeWork/Quotation/index.ts"

import CreativeWork from "../index.tsx"

export type Props = QuotationProps & BaseProps

export default function Quotation({
	spokenByCharacter,
	_type = "Quotation",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				spokenByCharacter,
				...subtypeProperties,
			}}
		/>
	)
}
