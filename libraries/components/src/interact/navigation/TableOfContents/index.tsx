/**
 * TableOfContents component
 *
 * Renders a table of contents using a nav element with nested lists.
 * Supports automatic numbering and different depth levels. Can be
 * styled for print with page numbers or digital with hyperlinks.
 *
 * Example usage:
 *
 * <TableOfContents>
 *   <TocEntry title="Introduction" page="1" href="#intro" />
 *   <TocEntry title="Chapter 1: Getting Started" page="5" href="#ch1">
 *     <TocEntry title="Installation" page="6" href="#ch1-install" />
 *     <TocEntry title="Configuration" page="12" href="#ch1-config" />
 *   </TocEntry>
 * </TableOfContents>
 */
