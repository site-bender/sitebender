import type BaseProps from "../../../../../../types/index.ts"
import type { APIReferenceProps } from "../../../../../../types/Thing/CreativeWork/Article/TechArticle/APIReference/index.ts"

import TechArticle from "../index.tsx"

export type Props = APIReferenceProps & BaseProps

export default function APIReference({
	assembly,
	assemblyVersion,
	executableLibraryName,
	programmingModel,
	targetPlatform,
	_type = "APIReference",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TechArticle
			{...props}
			_type={_type}
			subtypeProperties={{
				assembly,
				assemblyVersion,
				executableLibraryName,
				programmingModel,
				targetPlatform,
				...subtypeProperties,
			}}
		/>
	)
}
