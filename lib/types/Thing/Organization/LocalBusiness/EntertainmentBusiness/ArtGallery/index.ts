import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { EntertainmentBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

export interface ArtGalleryProps {
}

type ArtGallery =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& EntertainmentBusinessProps
	& OrganizationProps
	& ArtGalleryProps

export default ArtGallery
