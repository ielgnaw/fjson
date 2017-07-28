/**
 * @file main entry
 * @author ielgnaw <wuji0223@gmail.com>
 */


/**
 * 单行注释
 * 多行注释
 * 单引号
 * 无引号
 * 注释 directive: @
 */

import Tokenizer from './tokenizer';

class Parser {
    constructor(fileContent) {
        this.fileContent = fileContent;
        this.tokenizer = new Tokenizer(this.fileContent);
    }
}

/**
 * 主函数 parser
 *
 * @param {string} fileContent fjson 文件内容
 */
export default function (fileContent) {
    // const tokens = tokenizer(fileContent);
    const parser = new Parser(fileContent);
};

// const isOperator = c => /[+\-*\/\^%=(),]/.test(c);

// const isDigit = c => /[0-9]/.test(c);

// const isWhiteSpace = c => /\s/.test(c);

// const isIdentifier = c => typeof c === 'string' && !isOperator(c) && !isDigit(c) && !isWhiteSpace(c)

// const lexer = input => {
//     const tokens = [];

//     let c;
//     let i = 0;

//     const next = () => {
//         c = input[++i];
//         return c;
//     };

//     const addToken = (type, value) => {
//         tokens.push({
//             type: type,
//             value: value
//         });
//     };

//     while (i < input.length) {
//         c = input[i];
//         if (isWhiteSpace(c)) {
//             next();
//         }
//         else if (isDigit(c)) {
//             let value = '';
//             while (isDigit(c)) {
//                 value += c;
//                 next();
//             }
//             addToken('number', value);
//             next();
//         }
//         else if (isOperator(c)) {
//             addToken('operator', c);
//             next();
//         }
//         else if (isIdentifier(c)) {
//             let idn = c;
//             while (isIdentifier(next())) {
//                 idn += c;
//             }
//             addToken('identifier', idn);
//         }
//         else {
//             throw 'Unrecognized token.';
//         }
//     }

//     return tokens;
// };

// // 3
// // 2 ^ 8
// // (12 % 7) * (3 + 2)
// // 19 / -9
// // console.log(lexer('2 ^ 8'));
// // console.log(lexer('(12 + 4) / 6'));
// console.log(lexer('12 + 4 / 6'));
