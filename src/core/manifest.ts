import { readFileSync } from 'fs';
import { join } from 'path';

interface PackageManifest {
  name: string;
  version: string;
  description?: string;
}

export const manifest = JSON.parse(
  readFileSync(join(process.cwd(), 'package.json'), 'utf8'),
) as PackageManifest;
