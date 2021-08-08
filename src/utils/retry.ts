export const wait = (timeout: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

export const retry = async (fn: () => Promise<void>, timeout: number) => {
  while (true) {
    await fn().catch(() => {})
    await wait(timeout)
  }
}
