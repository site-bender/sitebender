We should consider supporting additional markup languages beyond HTML, SVG, MathML, and SSML. Here are some candidates, categorized by their relevance and browser support:

Browser‑native or directly supported
 • XHTML: The XML serialization of HTML; browsers still support application/xhtml+xml alongside HTML5.
 • SVG: Already on your list; remains the vector/graphics markup standard in the web platform.
 • MathML: Already on your list; now broadly supported for inline math in modern engines.

Semantic metadata in HTML
 • RDFa: Attribute‑based markup to embed linked‑data triples within HTML or XHTML.
 • Microdata: HTML attributes for structured data; widely used historically, now often complemented by JSON‑LD.
 • Microformats: Convention‑based class/rel attributes (e.g., h-card, h-event) for lightweight semantic markup.

Media captions/subtitles
 • WebVTT: Native caption/subtitle markup for the HTML5 track element; widely supported in browsers.
 • TTML/IMSC: XML timed‑text used in broadcast/OTT; not natively rendered by browsers but often supported via JS players.

XML vocabularies often used with web tech
 • XHTML5: Modern HTML5 documents can be served as XML; useful for strict XML tooling.
 • XSLT 1.0: Client‑side XML transformation is still implemented in major browsers (primarily 1.0); useful for XML→HTML pipelines.
 • TEI, DocBook, DITA: Domain‑specific XML for scholarly and technical docs; typically rendered in browsers via XSLT/CSS.
 • CML, GraphML, KML: Scientific/graph/map XML formats; viewed on the web via JS libraries rather than native support.

Legacy or limited
 • SMIL: XML animation; largely deprecated in favor of CSS and the Web Animations API, with only partial/legacy support.
 • XForms: XML forms model; never achieved broad browser support.
 • VoiceXML/SSML: SSML is on your list; VoiceXML targets voice platforms rather than web browsers.

Notes:
 • RSS/Atom on your list are XML syndication formats consumed by readers and services; browsers display them as XML but don’t “run” them.
 • JSON‑LD is ubiquitous for structured data on the web, but it’s JSON, not markup.
