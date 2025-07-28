import { walk } from "https://deno.land/std@0.203.0/fs/walk.ts";

const typesRoot = "lib/types/Thing";

for await (const entry of walk(typesRoot, {
  includeDirs: false,
  exts: [".ts"]
})) {
  if (!entry.name.endsWith("index.ts")) {
    continue;
  }

  const typeFilePath = entry.path;

  try {
    // Read the file
    const content = await Deno.readTextFile(typeFilePath);
    const lines = content.split('\n');

    // Find the type definition line (starts with "type")
    const typeLineIndex = lines.findIndex(line =>
      line.trim().startsWith('type ')
    );

    if (typeLineIndex === -1) {
      console.log(`❌ No type definition found in ${typeFilePath}`);
      continue;
    }

    // Find the export default line
    const exportDefaultIndex = lines.findIndex(line =>
      line.trim().startsWith('export default')
    );

    if (exportDefaultIndex === -1) {
      console.log(`❌ No export default found in ${typeFilePath}`);
      continue;
    }

    // Extract lines between type and export default (exclusive)
    const typeDefinitionLines = lines.slice(typeLineIndex, exportDefaultIndex);
    const typeDefinition = typeDefinitionLines.join('\n');

    // Extract the type name (e.g., "Place" from "type Place =")
    const typeNameMatch = typeDefinition.match(/^type\s+(\w+)\s*=/);
    if (!typeNameMatch) {
      console.log(`❌ Could not extract type name from ${typeFilePath}`);
      continue;
    }

    const typeName = typeNameMatch[1];

    // Remove everything up to and including the equals sign
    const afterEquals = typeDefinition.split('=')[1];

    if (!afterEquals) {
      console.log(`❌ Could not find type definition after = in ${typeFilePath}`);
      continue;
    }

    // Remove ampersands and split by them, then clean up whitespace
    const unionTypes = afterEquals
      .split('&')
      .map(type => type.trim())
      .filter(type => type.length > 0)
      .map(type => type.replace(/\n/g, '').trim());

		const typeDec = `type ${typeName} = (${unionTypes.join(' & ')}) | ${typeName}Component;`;

    console.log(typeName);
    console.log(JSON.stringify(unionTypes));
		console.log(typeDec);
    console.log();

  } catch (error) {
    console.error(`❌ Error processing ${typeFilePath}:`, error);
  }
}
