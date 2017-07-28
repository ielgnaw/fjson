/**
 * @file single_comment example
 * @author ielgnaw <wuji0223@gmail.com>
 */

import {join} from 'path';
import fjson from '../../src';
import {readFileSync} from 'fs';

const fileContent = readFileSync(join(__dirname, './index.fjson'), {encoding: 'utf8'});
// console.log(fileContent);
fjson(fileContent);
