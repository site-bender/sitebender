import type { Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface PublicationVolumeProps {
	pageEnd?: Integer | Text
	pageStart?: Integer | Text
	pagination?: Text
	volumeNumber?: Integer | Text
}

type PublicationVolume =
	& Thing
	& CreativeWorkProps
	& PublicationVolumeProps

export default PublicationVolume
