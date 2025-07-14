import { Integer, Text, URL } from "../../../DataType/index.ts"
import Distance from "../../Intangible/Quantity/Distance/index.ts"
import Mass from "../../Intangible/Quantity/Mass/index.ts"
import QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import Person from "../../Person/index.ts"
import CreativeWork from "../index.ts"

export default interface VisualArtwork extends CreativeWork {
	/** The number of copies when multiple copies of a piece of artwork are produced - e.g. for a limited edition of 20 prints, 'artEdition' refers to the total number of copies (in this example "20"). */
	artEdition?: Integer | Text
	/** The material used. (E.g. Oil, Watercolour, Acrylic, Linoprint, Marble, Cyanotype, Digital, Lithograph, DryPoint, Intaglio, Pastel, Woodcut, Pencil, Mixed Media, etc.) */
	artMedium?: Text | URL
	/** e.g. Painting, Drawing, Sculpture, Print, Photograph, Assemblage, Collage, etc. */
	artform?: Text | URL
	/** The primary artist for a work     	in a medium other than pencils or digital line art--for example, if the     	primary artwork is done in watercolors or digital paints. */
	artist?: Person
	/** The supporting materials for the artwork, e.g. Canvas, Paper, Wood, Board, etc. */
	artworkSurface?: URL | Text
	/** The individual who adds color to inked drawings. */
	colorist?: Person
	/** The depth of the item. */
	depth?: QuantitativeValue | Distance
	/** The height of the item. */
	height?: Distance | QuantitativeValue
	/** The individual who traces over the pencil drawings in ink after pencils are complete. */
	inker?: Person
	/** The individual who adds lettering, including speech balloons and sound effects, to artwork. */
	letterer?: Person
	/** The individual who draws the primary narrative artwork. */
	penciler?: Person
	/** A material used as a surface in some artwork, e.g. Canvas, Paper, Wood, Board, etc. */
	surface?: URL | Text
	/** The weight of the product or person. */
	weight?: Mass | QuantitativeValue
	/** The width of the item. */
	width?: Distance | QuantitativeValue
}
