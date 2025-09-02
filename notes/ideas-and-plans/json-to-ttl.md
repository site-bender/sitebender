# Converting JSON to TTL (Turtle) and back

There are several ways to convert between JSON and Turtle (TTL), which is a format for representing RDF (Resource Description Framework) data. The conversion process typically involves interpreting JSON data as structured linked data, often using JSON-LD (JSON for Linked Data) as an intermediate step. Below is a summary of methods and tools for both directions of conversion, along with key considerations.

### 🔧 1. **JSON to Turtle Conversion**

- **Using JSON-LD Context**: The most standardized approach is to first define a `@context` in your JSON data to map JSON properties to RDF vocabularies (e.g., [schema.org](https://schema.org/), custom ontologies). This converts JSON into JSON-LD, which can then be serialized to Turtle. Tools like [`jsonld2rdf`](https://json-ld.org/spec/latest/json-ld-rdf/) or **[Apache Jena's RIOT CLI](https://jena.apache.org/documentation/io/)** (this should be our preferred method) can handle this.
  - Example JSON-LD context:
    ```json
    {
      "@context": {
        "name": "http://schema.org/name",
        "age": "http://schema.org/age"
      },
      "name": "Bart Simpson",
      "age": 11
    }
    ```
- **Direct Conversion Tools**: For JSON without pre-defined context, tools like **[AtomGraph's JSON2RDF](https://github.com/AtomGraph/JSON2RDF)** or **[SPARQL Anything](https://github.com/SPARQL-Anything/sparql.anything)** can mechanically convert JSON keys to RDF predicates (using a base URI you provide). This generates Turtle with blank nodes for nested structures.
  - Command example for JSON2RDF:
    ```bash
    java -jar json2rdf.jar http://example.com/ < input.json > output.ttl
    ```
- **Programmatic Methods**:
  - JavaScript: Use [`jsonld.js` (Digital Bazaar)](https://github.com/digitalbazaar/jsonld.js) or [`rdflib.js`](https://github.com/linkeddata/rdflib.js) to serialize JSON-LD to Turtle .
  - Java: [Apache Jena's `Model` API](https://jena.apache.org/documentation/javadoc/jena/org.apache.jena.core/org/apache/jena/rdf/model/Model.html) can read JSON-LD and write Turtle.
  - Ruby: The `rdf` gem CLI can serialize JSON-LD to Turtle .

### 🔄 2. **Turtle to JSON Conversion**

- **Via JSON-LD**: Most tools convert Turtle to JSON-LD first, which is a JSON-based RDF serialization. Tools like:
  - **EasyRDF Converter** (online tool) .
  - **Apache Jena RIOT** :
    ```bash
    riot --output=json-ld input.ttl > output.json
    ```
  - JavaScript: `rdflib.js` or `jsonld.js` can parse Turtle and serialize to JSON-LD .
- **Custom Transformation**: If you need non-JSON-LD JSON (e.g., simpler structure), you may need post-processing with tools like `jq` or custom scripts to reshape the data.

### ⚠️ 3. **Key Considerations**

- **Vocabulary Mapping**: For meaningful RDF, define or reuse existing vocabularies (e.g., schema.org, Dublin Core) rather than inventing new properties .
- **Data Loss**: Converting arbitrary JSON to Turtle may flatten structures into triples (using blank nodes), and converting back might not perfectly reconstruct the original JSON. **QUESTION: How can we avoid this problem?**
- **Tool Compatibility**: Some tools (e.g., `jsonld2rdf`) expect JSON-LD input, while others (e.g., JSON2RDF) work with any JSON but require a base URI.

### 🛠️ 4. **Recommended Tools** (recommended by DeepSeek)

- **Online Converters**:
  - EasyRDF Converter (supports JSON-LD ↔ Turtle) .
- **Command-Line Tools**:
  - `jsonld2rdf` (Node.js) for JSON-LD to Turtle .
  - Apache Jena RIOT for multi-format RDF processing .
  - AtomGraph JSON2RDF for raw JSON to RDF .
- **Libraries**:
  - JavaScript: `jsonld.js`, `rdflib.js` .
  - Java: Apache Jena, RDF4J.
  - Python: `rdflib`.

### 📋 5. **Example Workflow**

- **JSON to Turtle**:
  1.  Add a `@context` to JSON to create JSON-LD.
  2.  Use `jsonld2rdf` to convert to Turtle:
      ```bash
      jsonld2rdf input.json --context my_context.json --prefixes true > output.ttl
      ```
- **Turtle to JSON**:
  1.  Use `riot` to convert Turtle to JSON-LD:
      ```bash
      riot --output=json-ld input.ttl > output.json
      ```
  2.  Optionally remove or simplify the `@context` if plain JSON is needed.

### 💡 6. **When to Use Which**

- **Use JSON-LD** if you want semantic interoperability and linked data compliance.
- **Use direct tools like JSON2RDF** for quick conversion without modifying JSON structure.
- **For round-tripping**, ensure your JSON data is compatible with RDF (e.g., avoid non-atomic values) to avoid data loss.

For most users, **JSON-LD with a well-designed context** is the recommended approach for seamless conversion between JSON and Turtle. But probably not for us. Discuss.
