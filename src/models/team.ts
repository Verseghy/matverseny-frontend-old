import { GetTeamInfoResponse } from '../proto/team_pb'

export enum MemberRank {
  MEMBER,
  COOWNER,
  OWNER,
}

export type Class = 9 | 10 | 11 | 12

export interface Member {
  readonly id: string
  name: string
  class: Class
  rank: MemberRank
}

export interface TeamInfo {
  name: string
  code: string
  members: Member[]
}

const classes: { [key in GetTeamInfoResponse.Member.Class]: Class } = {
  [GetTeamInfoResponse.Member.Class.K_9]: 9,
  [GetTeamInfoResponse.Member.Class.K_10]: 10,
  [GetTeamInfoResponse.Member.Class.K_11]: 11,
  [GetTeamInfoResponse.Member.Class.K_12]: 12,
} as const

const ranks = {
  [GetTeamInfoResponse.Member.Rank.K_MEMBER]: MemberRank.MEMBER,
  [GetTeamInfoResponse.Member.Rank.K_COOWNER]: MemberRank.COOWNER,
  [GetTeamInfoResponse.Member.Rank.K_OWNER]: MemberRank.OWNER,
} as const

export const convertMember = (member: GetTeamInfoResponse.Member): Member => {
  return {
    id: member.getId(),
    name: member.getName(),
    class: classes[member.getClass()],
    rank: ranks[member.getRank()],
  }
}

export const convertTeamInfo = (teamInfo: GetTeamInfoResponse): TeamInfo => {
  return {
    name: teamInfo.getName(),
    code: teamInfo.getJoinCode(),
    members: teamInfo.getMembersList().map((member) => convertMember(member)),
  }
}
