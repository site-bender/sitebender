const pathsData = JSON.parse(Deno.readTextFileSync('paths-single.json'));

// Fix Thing type
if (pathsData.Thing) {
    pathsData.Thing = {
        location: "Thing/index.ts",
        reExports: [],
        imports: []  // Thing has no inheritance
    };
}

Deno.writeTextFileSync('paths-single.json', JSON.stringify(pathsData, null, 2));
console.log('Fixed Thing type');
