import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const privateName = "gôm nhặt trên mạng";
const privateRoot = path.join(root, privateName);
assert(existsSync(privateRoot) || process.env.CI === "true", "Original reference directory must remain in place locally");
const git = (args: string[]) => execFileSync("git", args, { encoding: "utf8", cwd: root });
assert(!git(["ls-files", "-z"]).split("\0").some(filename => filename.split("/").includes(privateName)), "Private references are tracked by Git");
const probes = [`${privateName}/probe.txt`, `nested/${privateName}/probe.txt`];
for (const probe of probes) assert(git(["check-ignore", "--", probe]).trim(), `Ignore rule missing for ${probe}`);
const history = git(["log", "--all", "--format=%h", "--", privateName, `:(glob)**/${privateName}/**`]).trim();
assert(!history, "Private folder appears in Git history. Report to the owner before any history rewrite.");
function files(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.isSymbolicLink()) return [];
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? files(filename) : entry.isFile() ? [filename] : [];
  });
}
const references = existsSync(privateRoot) ? files(privateRoot) : [];
const referenceNames = new Set(references.map(filename => path.basename(filename)));
const bySize = new Map<number, Set<string>>();
const digest = (filename: string) => createHash("sha256").update(readFileSync(filename)).digest("hex");
for (const filename of references) {
  const size = statSync(filename).size;
  if (!size) continue;
  if (!bySize.has(size)) bySize.set(size, new Set());
  bySize.get(size)!.add(digest(filename));
}
assert(existsSync(path.join(root, ".next/BUILD_ID")), "Run npm run build before auditing production output");
const buildFiles = files(path.join(root, ".next"));
for (const filename of buildFiles) {
  assert(!filename.split(path.sep).includes(privateName), `Private directory in build: ${filename}`);
  assert(!referenceNames.has(path.basename(filename)), `Reference filename copied into build: ${filename}`);
  const candidates = bySize.get(statSync(filename).size);
  if (candidates) assert(!candidates.has(digest(filename)), `Private file bytes copied into build: ${filename}`);
  if (filename.endsWith(".nft.json")) {
    const trace = JSON.parse(readFileSync(filename, "utf8")) as { files?: string[] };
    assert(!trace.files?.some(file => file.replace(/\\/g, "/").split("/").includes(privateName)), `Private file traced: ${filename}`);
  }
}
for (const directory of ["public", "out", "dist"]) {
  const target = path.join(root, directory);
  if (existsSync(target)) for (const filename of files(target)) {
    assert(!filename.split(path.sep).includes(privateName) && !referenceNames.has(path.basename(filename)), `Private material in public output: ${filename}`);
    const candidates = bySize.get(statSync(filename).size);
    if (candidates) assert(!candidates.has(digest(filename)), `Private bytes in public output: ${filename}`);
  }
}
console.log(`PASS: ${references.length ? `${references.length} local reference files preserved` : "Private reference directory absent from CI checkout"}; none tracked, in Git history, copied into build, traced or in public output.`);
console.log(`PASS: root/nested ignore probes and ${buildFiles.length} production/cache files checked.`);
