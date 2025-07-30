import type BaseProps from "../../../../types/index.ts"
import type AlignmentObjectProps from "../../../../types/Thing/Intangible/AlignmentObject/index.ts"

import Intangible from "../index.tsx"

export type Props = AlignmentObjectProps & BaseProps

export default function AlignmentObject({
	alignmentType,
	educationalFramework,
	targetDescription,
	targetName,
	targetUrl,
	_type = "AlignmentObject",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				alignmentType,
				educationalFramework,
				targetDescription,
				targetName,
				targetUrl,
				...subtypeProperties,
			}}
		>{children}</Intangible>
	)
}
