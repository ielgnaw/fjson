/**
 * @file 通用方法
 * @author ielgnaw <wuji0223@gmail.com>
 */

/**
 * 根据行号获取当前行的内容
 *
 * @param {number} line 行号
 * @param {string} fileData 文件内容
 * @param {boolean} isReplaceSpace 是否去掉空格
 *
 * @return {string} 当前行内容
 */
export function getLineContent(line, fileData, isReplaceSpace) {
    let content = fileData.split('\n')[line - 1];
    if (isReplaceSpace) {
        content = content.replace(/\s*/, '');
    }
    return content;
}
