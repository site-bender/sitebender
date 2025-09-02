# Extending the schema.org types for Linked Data

## 1. Create a well-documented OWL/SHACL vocabulary for our custom types.

Absolutely. This is an excellent approach for building a robust, validated, extended schema system for our own purposes. The combination of **Protégé** for ontology creation and **SHACL** for validation is a powerful and standard-compliant stack for exactly what you want to do.

Let's break down how each part fits into our workflow.

---

### ✅ 1. Using Protégé to Create the Ontology

**Protégé is the perfect tool for this job.** It is the most widely used, open-source ontology editor for defining classes, properties, and their relationships.

**Our workflow in Protégé would be:**

1.  **Create a New Ontology:** Start a new OWL ontology.
2.  **Import Schema.org:** To properly extend it, you should import the Schema.org ontology. This allows you to reference its classes and properties directly.
    - **How to import:** Go to `File -> Make imports -> Import ontology...` and use the IRI `https://schema.org/version/latest/schemaorg-current-https.owl`. (Note: This file is very large; Protégé may take a moment to process it).
    - **Alternative:** You can also simply use the Schema.org classes by their full IRIs (e.g., `https://schema.org/Person`) without importing the entire ontology, which is faster but less integrated within Protégé.
3.  **Define Our Custom Class (e.g., `my:Engineer`):**
    - Create a new class under our custom namespace (e.g., `http://example.com/myVocab#Engineer`).
    - In the `SubClass Of` section, add the official Schema.org class you want to extend, e.g., `schema:Person` (or its full IRI if you didn't import it).
4.  **Define Our Custom Properties (e.g., `my:programmingLanguage`):**
    - Create a new data property or object property.
    - Set its domain (`rdfs:domain`) to our custom class `my:Engineer`. This means the property is intended for use on instances of that class.
    - Set its range (`rdfs:range`) to `xsd:string` (for literal values) or another appropriate XML Schema type or class.

**What we'll end up with:** A formal OWL ontology file (e.g., in `.owl` or `.ttl` format) that defines `my:Engineer` as a subclass of `schema:Person` and declares our custom properties. This is the "schema" or "data model" for our system.

---

### ✅ 2. Using SHACL for Validation (Including HTML Content)

**SHACL (Shapes Constraint Language) is the ideal choice for validation** and it works perfectly with the ontology we build in Protégé. While OWL defines _what exists_, SHACL defines _what valid data looks like_.

SHACL is far more expressive for validation than OWL. You can validate things that are impossible or very cumbersome to define in pure OWL.

**How we would use SHACL to validate our JSON-LD and HTML content:**

1.  **Create SHACL Shapes:** We will write SHACL shapes that target our custom classes (e.g., `my:Engineer`). These shapes define the constraints.
2.  **Validate Data Properties:**
    - `sh:minCount`, `sh:maxCount`: Mandate the presence or limit the number of a property (e.g., an `Engineer` must have exactly one `name`).
    - `sh:datatype`: Ensure a value is a string, integer, etc. (e.g., `schema:name` must be an `xsd:string`).
    - `sh:pattern`: Validate a string against a regex pattern (e.g., an `email` property must match an email regex).
3.  **Validate HTML Content (This is key for our goal):** This is where SHACL shines. We can use `sh:js` to define custom JavaScript constraints. This JavaScript has access to the data node being validated.

    **Example SHACL Shape to validate an HTML string:**

    ```turtle
    # Define a shape for my:Engineer
    my:EngineerShape a sh:NodeShape;
        sh:targetClass my:Engineer;
        sh:property [
            sh:path schema:description; # The property to validate
            sh:name "description";
            sh:message "Description must be a valid HTML fragment containing a <ul> list.";
            sh:js """
                function isValidHtmlDescription(description) {
                    // 1. Create a temporary DOM parser to check HTML structure
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(description, 'text/html');

                    // 2. Check for unwanted elements (e.g., scripts - a security must!)
                    if (doc.querySelector('script')) {
                        return false;
                    }

                    // 3. Check for required elements (e.g., it must contain a list)
                    if (!doc.querySelector('ul')) {
                        return false;
                    }

                    // 4. We could also check for specific CSS classes
                    // if (!doc.querySelector('.my-special-class')) { return false; }

                    return true;
                }

                // The value is the value of the schema:description property
                isValidHtmlDescription(value);
            """;
        ].
    ```

    - **This is a very powerful feature.** We can write any JavaScript logic to validate the structure, attributes, and content of the HTML in our properties.

4.  **Run the Validation:** We will use a SHACL validation engine (like [TopBraid SHACL API](https://github.com/TopQuadrant/shacl) or [pySHACL](https://github.com/RDFLib/pySHACL)) to run our data (the JSON-LD instance) against our SHACL shapes file.
    - **Input:** Our instance data (JSON-LD) + Our SHACL shapes file.
    - **Output:** A validation report telling us if the data conforms (`sh:conforms true`) or a list of specific violations if it doesn't.

---

### 🚀 Recommended End-to-End Workflow

1.  **Modeling (Protégé):**
    - Create our ontology (`myVocab.owl`), defining `my:Engineer` `rdfs:subClassOf schema:Person` and our custom properties.

2.  **Validation Rules (Text Editor/Protégé):**
    - Create a separate SHACL shapes file (`myShapes.shacl.ttl`) that imports or references our custom ontology and defines all our constraints, including the complex HTML validation via `sh:js`.

3.  **Data Creation (Our Application):**
    - Generate JSON-LD instances that use types from both `@contexts`: `["schema:Person", "my:Engineer"]`.

4.  **Validation (Server-Side or Build Process):**
    - Before storing or serving the JSON-LD, run it through a SHACL validation engine with our rules.
    - If it fails, check the report, fix the data, and try again.

### ⚠️ Important Considerations

- **Performance:** Complex JavaScript-based SHACL validation can be computationally expensive. Run it on the server-side, not in the user's browser.
- **Security:** The `sh:js` function is a powerful feature. If you are accepting SHACL shapes from untrusted sources, this is a major security risk. In our case, you control the shapes, so it's safe.
- **Tooling:** Not all SHACL validators support the advanced `sh:js` feature. You must choose one that does, like the TopQuadrant SHACL Java engine or the commercial edition of TopBraid.

**Conclusion: Our plan is not only feasible but is also based on industry-standard semantic web technologies.** Using Protégé for the ontology and SHACL (with custom JavaScript functions) for validating both data integrity and HTML content is a sophisticated and highly effective solution for creating a quality-controlled, extended data ecosystem.

### Generate SHACL from TypeScript

This is a very clean approach. We **define our constraints in TypeScript** and then **generate the SHACL shapes file** as part of our build process.

We would create a builder pattern or use a library that lets us define shapes in code.

**Pseudo-Code Example:**

```typescript
// Define our shape in TypeScript **Is this the best way? Is there a more FP approach?**
const engineerShape = new NodeShape().targetClass(my.Engineer).property(
  new PropertyShape().path(schema.description).jsConstraint((value) => {
    // This function is written in TypeScript!
    const doc = new JSDOM(value).window.document;
    return !doc.querySelector("script") && doc.querySelector("ul");
  }),
);

// Run a function to serialize the shape to a SHACL Turtle file
generateShaclTurtleFile([engineerShape]);
```
