import type { Text } from "../../../DataType/index.ts"
import type { DataFeed, ImageObject, URL } from "../../index.ts"
import type { CreativeWork } from "../index.ts"

// SoftwareApplication interface - extends CreativeWork
// A software application.
export interface SoftwareApplication extends CreativeWork {
	applicationCategory?: Text | URL
	applicationSubCategory?: Text | URL
	applicationSuite?: Text
	availableOnDevice?: Text
	countriesNotSupported?: Text
	countriesSupported?: Text
	downloadUrl?: URL
	featureList?: Text | URL
	fileSize?: Text
	installUrl?: URL
	memoryRequirements?: Text | URL
	operatingSystem?: Text
	permissions?: Text
	processorRequirements?: Text
	releaseNotes?: Text | URL
	screenshot?: ImageObject | URL
	softwareAddOn?: SoftwareApplication
	softwareHelp?: CreativeWork
	softwareRequirements?: Text | URL
	softwareVersion?: Text
	storageRequirements?: Text | URL
	supportingData?: DataFeed
}
