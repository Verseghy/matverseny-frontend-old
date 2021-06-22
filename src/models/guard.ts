export interface ValidGuard {
  valid: true,
}

export interface InvalidGuard {
  valid: false,
  redirect: string,
}

export type Guard = ValidGuard | InvalidGuard
export type GuardHook = () => Promise<Guard>
