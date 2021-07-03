export interface ValidGuard {
  valid: true
}

export interface InvalidGuard {
  valid: false
  redirect: string
}

export type WaitGuard = 'wait'

export type Guard = ValidGuard | InvalidGuard | WaitGuard
export type GuardHook = () => Promise<Guard>
