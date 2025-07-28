import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"
import type { SoftwareApplicationProps } from "../../../../types/Thing/CreativeWork/SoftwareApplication/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	SoftwareApplicationProps,
	"SoftwareApplication",
	ExtractLevelProps<ThingProps, CreativeWorkProps>
>

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
	schemaType = "SoftwareApplication",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
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
