/**
 * @file 词法分析
 * @author ielgnaw <wuji0223@gmail.com>
 */

import Debug from 'debug';
import events from 'events';

const debug = Debug('fjson:tokenizer');


/*
[
    {type: 'left-brace',  value: '{'       },
    {type: 'right-brace',  value: '}'       }
]
*/

/**
 * 词法分析
 *
 * @param {string} fileContent fjson 文件内容
 *
 * @return {Array} token 集合
 */
export default function (fileContent) {
    debug('start tokenize');
    const tokens = [];

    const fileContentLen = fileContent.length;

    let pos = 0;
    let offset = -1;
    let line = 1;

    while (pos < fileContentLen) {
        let char = fileContent[pos];

        if (char === '\n' || char === '\r'
                && fileContent[pos + 1] !== '\n') {
            offset = pos;
            line += 1;
        }

        switch (char) {
            case '{':
                tokens.push({
                    type: 'LEFT-BRACE',
                    value: char,
                    line: line,
                    col: pos - offset
                });
                break;
            case '}':
                tokens.push({
                    type: 'RIGHT-BRACE',
                    value: char,
                    line: line,
                    col: pos - offset
                });
                break;

            // 空格
            case ' ':
            // 制表符
            case '\t':
            // 垂直制表符
            case '\v':
            // 换行符
            case '\n':
            // 回车符
            case '\r':
            // 换页符
            case '\f':
                let spaceType;
                let next = pos;
                do {
                    next += 1;
                    char = fileContent[next];
                    if (char === '\n') {
                        offset = next;
                        line += 1;
                    }
                }
                while (char === ' ' || char === '\n' || char === '\t' || char === '\r' || char === '\f');

                tokens.push({
                    // 这里 S 的 type 包括了空格，制表符，垂直制表符，换行符，回车符，换页符
                    // 等价于 [ \f\n\r\t\v]
                    type: 'S',
                    value: fileContent.slice(pos, next),
                    line: line,
                    col: pos - offset
                });

                pos = next - 1;
                break;
            default:

        }

        pos++;

        continue;
    }

    console.log(tokens);

    // console.log(fileContent);
    return tokens;
}
