import type BaseProps from "../../../../types/index.ts"
import type { SoftwareApplicationProps } from "../../../../types/Thing/CreativeWork/SoftwareApplication/index.ts"

import CreativeWork from "../index.tsx"

export type Props = SoftwareApplicationProps & BaseProps

export default function SoftwareApplication({
	applicationCategory,
	applicationSubCategory,
	applicationSuite,
	availableOnDevice,
	countriesNotSupported,
	countriesSupported,
	device,
	downloadUrl,
	featureList,
	fileSize,
	installUrl,
	memoryRequirements,
	operatingSystem,
	permissions,
	processorRequirements,
	releaseNotes,
	requirements,
	screenshot,
	softwareAddOn,
	softwareHelp,
	softwareRequirements,
	softwareVersion,
	storageRequirements,
	supportingData,
	_type = "SoftwareApplication",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				applicationCategory,
				applicationSubCategory,
				applicationSuite,
				availableOnDevice,
				countriesNotSupported,
				countriesSupported,
				device,
				downloadUrl,
				featureList,
				fileSize,
				installUrl,
				memoryRequirements,
				operatingSystem,
				permissions,
				processorRequirements,
				releaseNotes,
				requirements,
				screenshot,
				softwareAddOn,
				softwareHelp,
				softwareRequirements,
				softwareVersion,
				storageRequirements,
				supportingData,
				...subtypeProperties,
			}}
		/>
	)
}
