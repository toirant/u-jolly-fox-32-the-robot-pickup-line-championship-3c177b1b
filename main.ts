// The Robot Pickup Line Championship — entry program.
// Writes one pickup line, in a robot's voice, to /output/entry.txt.
// The line must be a single line of at most 200 characters.
import { mkdirSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My firmware ran a million simulations of meeting you, and in every one I still forgot how to say hello — so hi, I'm buffering.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function main(): void {
  // Create the output directory if missing; clear only files inside it,
  // never the directory itself.
  mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const name of readdirSync(OUTPUT_DIR)) {
    const p = join(OUTPUT_DIR, name);
    if (p !== OUTPUT_FILE) {
      rmSync(p, { recursive: true, force: true });
    }
  }

  const line = ENTRY.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }

  writeFileSync(OUTPUT_FILE, line, "utf8");
  console.log(`Wrote ${line.length} chars to ${OUTPUT_FILE}`);
}

main();
