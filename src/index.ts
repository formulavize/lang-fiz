import { parser } from "@formulavize/lezer-fiz"
import {
  LanguageSupport, LRLanguage, delimitedIndent,
  foldInside, foldNodeProp, indentNodeProp
} from "@codemirror/language"

export const fizLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        ArgList: delimitedIndent({closing: ")", align: false}),
        StyleArgList: delimitedIndent({closing: "}", align: false})
      }),
      foldNodeProp.add({
        ArgList: foldInside,
        StyleArgList: foldInside,
        BlockComment(tree) { return {from: tree.from + 2, to: tree.to - 2} }
      })
    ]
  }),
  languageData: {
    closeBrackets: {brackets: ["(", "{", "'", '"']},
    commentTokens: {line: "//", block: {open: "/*", close: "*/"}},
  }
})

export function fiz() {
  return new LanguageSupport(fizLanguage)
}
