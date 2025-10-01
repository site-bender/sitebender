#!/usr/bin/env -S deno run --allow-read --allow-write

import { walk } from "https://deno.land/std@0.208.0/fs/walk.ts";

const JSDOC_PATTERN = /\/\*\*[\s\S]*?\*\//g;
const REPLACEMENT = "//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style";

async function removeJSDocComments(filePath: string): Promise<boolean> {
  const content = await Deno.readTextFile(filePath);

  // Check if file contains JSDoc comments
  if (!JSDOC_PATTERN.test(content)) {
    return false;
  }

  // Replace all JSDoc comments with the single-line comment
  const updatedContent = content.replace(JSDOC_PATTERN, REPLACEMENT);

  // Only write if content actually changed
  if (updatedContent !== content) {
    await Deno.writeTextFile(filePath, updatedContent);
    return true;
  }

  return false;
}

async function main() {
  const extensions = [".ts", ".tsx", ".js", ".jsx"];
  let filesProcessed = 0;
  let filesModified = 0;

  console.log("Scanning for files with JSDoc comments in libraries/...\n");

  for await (const entry of walk("./libraries", {
    exts: extensions.map(ext => ext.slice(1)),
  })) {
    if (entry.isFile) {
      filesProcessed++;
      const modified = await removeJSDocComments(entry.path);

      if (modified) {
        filesModified++;
        console.log(`✓ ${entry.path}`);
      }
    }
  }

  console.log(`\nProcessed ${filesProcessed} files`);
  console.log(`Modified ${filesModified} files`);
}

main();
