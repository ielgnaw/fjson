/**
 * @file 词法分析
 * @author ielgnaw <wuji0223@gmail.com>
 */

import Debug from 'debug';
import events from 'events';

import {getLineContent} from './util';

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

        if ((char === '\n' || char === '\r') && fileContent[pos + 1] !== '\n') {
            offset = pos;
            line += 1;
        }

        switch (char) {
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
            case '/':
                // TODO: directive

                const nextChar = fileContent[pos + 1];
                // 多行注释
                if (nextChar === '*') {

                }
                // 单行注释
                else if (nextChar === '/') {
                    tokens.push({
                        type: 'SINGLE_COMMENT',
                        value: getLineContent(line, fileContent),
                        line: line,
                        col: pos - offset
                    });
                }
                break;

            case '{':
                tokens.push({
                    type: 'LEFT_BRACE',
                    value: char,
                    line: line,
                    col: pos - offset
                });
                break;
            case '}':
                tokens.push({
                    type: 'RIGHT_BRACE',
                    value: char,
                    line: line,
                    col: pos - offset
                });
                break;

            case ':':
                tokens.push({
                    type: 'COLON',
                    value: char,
                    line: line,
                    col: pos - offset
                });
                break;

            default:
                const RE_WORD_END = /[ \n\t\r\f\v\(\)\{\}:;@!'"\\\]\[#]|\/(?=\*)/g;
                RE_WORD_END.lastIndex = pos + 1;
                RE_WORD_END.exec(fileContent);
                // if (RE_WORD_END.lastIndex === 0) {
                //     next = fileContentLen - 1;
                // }
                // else {
                //     next = RE_WORD_END.lastIndex - 2;
                // }
                next = RE_WORD_END.lastIndex - 2;

                console.log('---' + fileContent.slice(pos, next + 1) + '--');
                pos = next;
                break;

        }

        pos++;

        continue;
    }

    console.log(tokens);

    // console.log(fileContent);
    return tokens;
}
