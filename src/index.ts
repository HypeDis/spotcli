#!/usr/bin/env node

import { Command } from 'commander';
import * as npmPackage from '../package.json';

const program = new Command();
// program.version(npmPackage.version);
program.version(npmPackage.version).parse(process.argv);
