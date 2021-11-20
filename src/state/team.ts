import { atom, getAtomValue, selector, setAtomValue } from 'yauk'
import { convertTeamInfo, MemberRank, TeamInfo } from '../models/team'
import {
  ChangeCoOwnerStatusRequest,
  ChangeLockRequest,
  DisbandTeamRequest,
  GenerateJoinCodeRequest,
  GetTeamInfoRequest,
  KickUserRequest,
  LeaveTeamRequest,
  UpdateTeamRequest,
} from '../proto/team_pb'
import { teamService } from '../services'
import { authClaims, newToken } from './auth'
import { store } from './store'

export const fetchTeamInfo = async (): Promise<TeamInfo> => {
  const req = new GetTeamInfoRequest()
  const info = await teamService.getTeamInfo(req, null)
  return convertTeamInfo(info)
}

export const teamInfo = atom(fetchTeamInfo)
export const teamError = atom('')

export const userInfo = selector((get) => {
  const team = get(teamInfo)
  const claims = get(authClaims)

  if (claims === null) return null

  const member = team.members.find((member) => member.id === claims.user_id)

  if (member === undefined) return null

  return {
    id: claims.user_id,
    rank: member.rank,
  }
})

const error = (err: any) => {
  if (err === null) {
    setAtomValue(store, teamError, '')
    return
  }

  setAtomValue(store, teamError, (err as Error).message)
}

export const refetchTeamInfo = async () => {
  const info = await fetchTeamInfo()
  setAtomValue(store, teamInfo, info)
}

export const regenerateJoinCode = async () => {
  const req = new GenerateJoinCodeRequest()
  try {
    const code = await teamService.generateJoinCode(req, null)
    setAtomValue(store, teamInfo, (state) => ({
      ...state,
      code: code.getNewCode(),
    }))
    error(null)
  } catch (err: any) {
    error(err)
  }
}

export const leaveTeam = async () => {
  const req = new LeaveTeamRequest()
  try {
    await teamService.leaveTeam(req, null)
    await newToken()
    error(null)
  } catch (err: any) {
    error(err)
  }
}

export const deleteTeam = async () => {
  const req = new DisbandTeamRequest()
  try {
    await teamService.disbandTeam(req, null)
    await newToken()
    error(null)
  } catch (err: any) {
    error(err)
  }
}

export const kickMember = async (userID: string) => {
  const req = new KickUserRequest().setUserId(userID)
  try {
    await teamService.kickUser(req, null)
    setAtomValue(store, teamInfo, (state) => ({
      ...state,
      members: state.members.filter((member) => member.id !== userID),
    }))
    error(null)
  } catch (err: any) {
    console.log(err)
    error(err)
  }
}

export const toggleCoOwnerStatus = async (userID: string) => {
  const info = await getAtomValue(store, teamInfo)
  const member = info.members.find((member) => member.id === userID)

  if (member === undefined || member.rank === MemberRank.OWNER) return

  const shouldCoOwner = member.rank === MemberRank.MEMBER
  const req = new ChangeCoOwnerStatusRequest().setUserId(userID).setShouldCoowner(shouldCoOwner)

  try {
    await teamService.changeCoOwnerStatus(req, null)
    setAtomValue(store, teamInfo, (state) => ({
      ...state,
      members: state.members.map((member) => {
        if (member.rank === MemberRank.COOWNER) return { ...member, rank: MemberRank.MEMBER }

        if (member.id === userID) {
          return {
            ...member,
            rank: shouldCoOwner ? MemberRank.COOWNER : MemberRank.MEMBER,
          }
        }

        return member
      }),
    }))
    error(null)
  } catch (err: any) {
    error(err)
  }
}

export const renameTeam = async (newName: string) => {
  const info = await getAtomValue(store, teamInfo)

  if (info.name === newName) return

  const req = new UpdateTeamRequest().setName(newName)

  try {
    await teamService.updateTeam(req, null)
    setAtomValue(store, teamInfo, (state) => ({
      ...state,
      name: newName,
    }))
    error(null)
  } catch (err: any) {
    error(err)
  }
}

export const changeLock = async (lock: boolean) => {
  const req = new ChangeLockRequest().setShouldLock(lock)

  try {
    await teamService.changeLock(req, null)
    setAtomValue(store, teamInfo, (state) => ({
      ...state,
      isLocked: lock,
    }))
    error(null)
  } catch (err: any) {
    error(err)
  }
}
