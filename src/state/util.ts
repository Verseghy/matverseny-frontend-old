import { Store, Atom, subscribeAtom } from 'yauk'

export const getAtomValue = async <T>(store: Store, atom: Atom<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    subscribeAtom(
      store,
      atom,
      (value, unsubscribe) => {
        unsubscribe()
        resolve(value)
      },
      (error, unsubscribe) => {
        unsubscribe()
        reject(error)
      }
    )
  })
}
