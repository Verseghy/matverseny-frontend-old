import { useMemo } from 'react'
import KaTeX from 'katex'

export const useFormattedProblem = (problemText: string) => {
  return useMemo(() => {
    let text = problemText
    const inline = problemText.match(/\$(?!\$)([^$]*)\$(?!\$)/g) || []
    const block = problemText.match(/\$\$([^$]*)\$\$/g) || []

    for (const i of inline) {
      const a = KaTeX.renderToString(i.substring(1, i.length - 1), {
        displayMode: false,
        throwOnError: false,
        errorColor: 'var(--red)',
      })
      text = text.replace(i, a)
    }

    for (const b of block) {
      const a = KaTeX.renderToString(b.substring(2, b.length - 2), {
        displayMode: true,
        throwOnError: false,
        errorColor: 'var(--red)',
      })
      text = text.replace(b, a)
    }

    return text
  }, [problemText])
}
