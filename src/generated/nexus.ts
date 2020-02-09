/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */

import * as Context from "../context"
import * as client from "@prisma/client"



declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ActivityCreateManyWithoutOrgInput: { // input type
    connect?: NexusGenInputs['ActivityWhereUniqueInput'][] | null; // [ActivityWhereUniqueInput!]
    create?: NexusGenInputs['ActivityCreateWithoutOrgInput'][] | null; // [ActivityCreateWithoutOrgInput!]
  }
  ActivityCreateOneWithoutSchedulesInput: { // input type
    connect?: NexusGenInputs['ActivityWhereUniqueInput'] | null; // ActivityWhereUniqueInput
    create?: NexusGenInputs['ActivityCreateWithoutSchedulesInput'] | null; // ActivityCreateWithoutSchedulesInput
  }
  ActivityCreateWithoutOrgInput: { // input type
    id?: string | null; // String
    name: string; // String!
    schedules?: NexusGenInputs['ScheduleCreateManyWithoutActivityInput'] | null; // ScheduleCreateManyWithoutActivityInput
    slug: string; // String!
  }
  ActivityCreateWithoutSchedulesInput: { // input type
    id?: string | null; // String
    name: string; // String!
    org: NexusGenInputs['OrgCreateOneWithoutActivitiesInput']; // OrgCreateOneWithoutActivitiesInput!
    slug: string; // String!
  }
  ActivityWhereUniqueInput: { // input type
    id?: string | null; // String
    slug?: string | null; // String
  }
  AttendanceCreateManyWithoutMemberInput: { // input type
    connect?: NexusGenInputs['AttendanceWhereUniqueInput'][] | null; // [AttendanceWhereUniqueInput!]
    create?: NexusGenInputs['AttendanceCreateWithoutMemberInput'][] | null; // [AttendanceCreateWithoutMemberInput!]
  }
  AttendanceCreateManyWithoutScheduleInput: { // input type
    connect?: NexusGenInputs['AttendanceWhereUniqueInput'][] | null; // [AttendanceWhereUniqueInput!]
    create?: NexusGenInputs['AttendanceCreateWithoutScheduleInput'][] | null; // [AttendanceCreateWithoutScheduleInput!]
  }
  AttendanceCreateWithoutMemberInput: { // input type
    createdAt?: any | null; // DateTime
    id?: string | null; // String
    present: boolean; // Boolean!
    schedule: NexusGenInputs['ScheduleCreateOneWithoutAttendancesInput']; // ScheduleCreateOneWithoutAttendancesInput!
    slug: string; // String!
    status: string; // String!
    updatedAt?: any | null; // DateTime
  }
  AttendanceCreateWithoutScheduleInput: { // input type
    createdAt?: any | null; // DateTime
    id?: string | null; // String
    member: NexusGenInputs['ProfileCreateOneWithoutAttendancesInput']; // ProfileCreateOneWithoutAttendancesInput!
    present: boolean; // Boolean!
    slug: string; // String!
    status: string; // String!
    updatedAt?: any | null; // DateTime
  }
  AttendanceWhereUniqueInput: { // input type
    id?: string | null; // String
    slug?: string | null; // String
  }
  GroupCreateInput: { // input type
    createdAt?: any | null; // DateTime
    endAt?: any | null; // DateTime
    groupEnrollments?: NexusGenInputs['GroupEnrollmentCreateManyWithoutGroupInput'] | null; // GroupEnrollmentCreateManyWithoutGroupInput
    id?: string | null; // String
    leader?: NexusGenInputs['ProfileCreateOneWithoutLeaderInput'] | null; // ProfileCreateOneWithoutLeaderInput
    members?: NexusGenInputs['ProfileCreateManyWithoutMemberInput'] | null; // ProfileCreateManyWithoutMemberInput
    name: string; // String!
    org?: NexusGenInputs['OrgCreateOneWithoutGroupsInput'] | null; // OrgCreateOneWithoutGroupsInput
    slug?: string | null; // String
    stage: string; // String!
    startAt?: any | null; // DateTime
    updatedAt?: any | null; // DateTime
    year?: number | null; // Int
  }
  GroupCreateManyWithoutLeaderInput: { // input type
    connect?: NexusGenInputs['GroupWhereUniqueInput'][] | null; // [GroupWhereUniqueInput!]
    create?: NexusGenInputs['GroupCreateWithoutLeaderInput'][] | null; // [GroupCreateWithoutLeaderInput!]
  }
  GroupCreateManyWithoutMembersInput: { // input type
    connect?: NexusGenInputs['GroupWhereUniqueInput'][] | null; // [GroupWhereUniqueInput!]
    create?: NexusGenInputs['GroupCreateWithoutMembersInput'][] | null; // [GroupCreateWithoutMembersInput!]
  }
  GroupCreateManyWithoutOrgInput: { // input type
    connect?: NexusGenInputs['GroupWhereUniqueInput'][] | null; // [GroupWhereUniqueInput!]
    create?: NexusGenInputs['GroupCreateWithoutOrgInput'][] | null; // [GroupCreateWithoutOrgInput!]
  }
  GroupCreateOneWithoutGroupEnrollmentsInput: { // input type
    connect?: NexusGenInputs['GroupWhereUniqueInput'] | null; // GroupWhereUniqueInput
    create?: NexusGenInputs['GroupCreateWithoutGroupEnrollmentsInput'] | null; // GroupCreateWithoutGroupEnrollmentsInput
  }
  GroupCreateWithoutGroupEnrollmentsInput: { // input type
    createdAt?: any | null; // DateTime
    endAt?: any | null; // DateTime
    id?: string | null; // String
    leader?: NexusGenInputs['ProfileCreateOneWithoutLeaderInput'] | null; // ProfileCreateOneWithoutLeaderInput
    members?: NexusGenInputs['ProfileCreateManyWithoutMemberInput'] | null; // ProfileCreateManyWithoutMemberInput
    name: string; // String!
    org?: NexusGenInputs['OrgCreateOneWithoutGroupsInput'] | null; // OrgCreateOneWithoutGroupsInput
    slug?: string | null; // String
    stage: string; // String!
    startAt?: any | null; // DateTime
    updatedAt?: any | null; // DateTime
    year?: number | null; // Int
  }
  GroupCreateWithoutLeaderInput: { // input type
    createdAt?: any | null; // DateTime
    endAt?: any | null; // DateTime
    groupEnrollments?: NexusGenInputs['GroupEnrollmentCreateManyWithoutGroupInput'] | null; // GroupEnrollmentCreateManyWithoutGroupInput
    id?: string | null; // String
    members?: NexusGenInputs['ProfileCreateManyWithoutMemberInput'] | null; // ProfileCreateManyWithoutMemberInput
    name: string; // String!
    org?: NexusGenInputs['OrgCreateOneWithoutGroupsInput'] | null; // OrgCreateOneWithoutGroupsInput
    slug?: string | null; // String
    stage: string; // String!
    startAt?: any | null; // DateTime
    updatedAt?: any | null; // DateTime
    year?: number | null; // Int
  }
  GroupCreateWithoutMembersInput: { // input type
    createdAt?: any | null; // DateTime
    endAt?: any | null; // DateTime
    groupEnrollments?: NexusGenInputs['GroupEnrollmentCreateManyWithoutGroupInput'] | null; // GroupEnrollmentCreateManyWithoutGroupInput
    id?: string | null; // String
    leader?: NexusGenInputs['ProfileCreateOneWithoutLeaderInput'] | null; // ProfileCreateOneWithoutLeaderInput
    name: string; // String!
    org?: NexusGenInputs['OrgCreateOneWithoutGroupsInput'] | null; // OrgCreateOneWithoutGroupsInput
    slug?: string | null; // String
    stage: string; // String!
    startAt?: any | null; // DateTime
    updatedAt?: any | null; // DateTime
    year?: number | null; // Int
  }
  GroupCreateWithoutOrgInput: { // input type
    createdAt?: any | null; // DateTime
    endAt?: any | null; // DateTime
    groupEnrollments?: NexusGenInputs['GroupEnrollmentCreateManyWithoutGroupInput'] | null; // GroupEnrollmentCreateManyWithoutGroupInput
    id?: string | null; // String
    leader?: NexusGenInputs['ProfileCreateOneWithoutLeaderInput'] | null; // ProfileCreateOneWithoutLeaderInput
    members?: NexusGenInputs['ProfileCreateManyWithoutMemberInput'] | null; // ProfileCreateManyWithoutMemberInput
    name: string; // String!
    slug?: string | null; // String
    stage: string; // String!
    startAt?: any | null; // DateTime
    updatedAt?: any | null; // DateTime
    year?: number | null; // Int
  }
  GroupEnrollmentCreateManyWithoutGroupInput: { // input type
    connect?: NexusGenInputs['GroupEnrollmentWhereUniqueInput'][] | null; // [GroupEnrollmentWhereUniqueInput!]
    create?: NexusGenInputs['GroupEnrollmentCreateWithoutGroupInput'][] | null; // [GroupEnrollmentCreateWithoutGroupInput!]
  }
  GroupEnrollmentCreateManyWithoutProfileInput: { // input type
    connect?: NexusGenInputs['GroupEnrollmentWhereUniqueInput'][] | null; // [GroupEnrollmentWhereUniqueInput!]
    create?: NexusGenInputs['GroupEnrollmentCreateWithoutProfileInput'][] | null; // [GroupEnrollmentCreateWithoutProfileInput!]
  }
  GroupEnrollmentCreateWithoutGroupInput: { // input type
    createdAt?: any | null; // DateTime
    id?: string | null; // String
    profile: NexusGenInputs['ProfileCreateOneWithoutGroupEnrollmentsInput']; // ProfileCreateOneWithoutGroupEnrollmentsInput!
    reason: string; // String!
    updatedAt?: any | null; // DateTime
  }
  GroupEnrollmentCreateWithoutProfileInput: { // input type
    createdAt?: any | null; // DateTime
    group: NexusGenInputs['GroupCreateOneWithoutGroupEnrollmentsInput']; // GroupCreateOneWithoutGroupEnrollmentsInput!
    id?: string | null; // String
    reason: string; // String!
    updatedAt?: any | null; // DateTime
  }
  GroupEnrollmentWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  GroupWhereUniqueInput: { // input type
    id?: string | null; // String
    slug?: string | null; // String
  }
  OrgCreateOneWithoutActivitiesInput: { // input type
    connect?: NexusGenInputs['OrgWhereUniqueInput'] | null; // OrgWhereUniqueInput
    create?: NexusGenInputs['OrgCreateWithoutActivitiesInput'] | null; // OrgCreateWithoutActivitiesInput
  }
  OrgCreateOneWithoutGroupsInput: { // input type
    connect?: NexusGenInputs['OrgWhereUniqueInput'] | null; // OrgWhereUniqueInput
    create?: NexusGenInputs['OrgCreateWithoutGroupsInput'] | null; // OrgCreateWithoutGroupsInput
  }
  OrgCreateOneWithoutProfilesInput: { // input type
    connect?: NexusGenInputs['OrgWhereUniqueInput'] | null; // OrgWhereUniqueInput
    create?: NexusGenInputs['OrgCreateWithoutProfilesInput'] | null; // OrgCreateWithoutProfilesInput
  }
  OrgCreateWithoutActivitiesInput: { // input type
    groups?: NexusGenInputs['GroupCreateManyWithoutOrgInput'] | null; // GroupCreateManyWithoutOrgInput
    id?: string | null; // String
    name: string; // String!
    profiles?: NexusGenInputs['ProfileCreateManyWithoutOrgInput'] | null; // ProfileCreateManyWithoutOrgInput
  }
  OrgCreateWithoutGroupsInput: { // input type
    activities?: NexusGenInputs['ActivityCreateManyWithoutOrgInput'] | null; // ActivityCreateManyWithoutOrgInput
    id?: string | null; // String
    name: string; // String!
    profiles?: NexusGenInputs['ProfileCreateManyWithoutOrgInput'] | null; // ProfileCreateManyWithoutOrgInput
  }
  OrgCreateWithoutProfilesInput: { // input type
    activities?: NexusGenInputs['ActivityCreateManyWithoutOrgInput'] | null; // ActivityCreateManyWithoutOrgInput
    groups?: NexusGenInputs['GroupCreateManyWithoutOrgInput'] | null; // GroupCreateManyWithoutOrgInput
    id?: string | null; // String
    name: string; // String!
  }
  OrgWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  PostCreateManyWithoutAuthorInput: { // input type
    connect?: NexusGenInputs['PostWhereUniqueInput'][] | null; // [PostWhereUniqueInput!]
    create?: NexusGenInputs['PostCreateWithoutAuthorInput'][] | null; // [PostCreateWithoutAuthorInput!]
  }
  PostCreateWithoutAuthorInput: { // input type
    content?: string | null; // String
    createdAt?: any | null; // DateTime
    id?: string | null; // String
    published?: boolean | null; // Boolean
    title: string; // String!
    updatedAt?: any | null; // DateTime
  }
  PostWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  ProfileCreateInput: { // input type
    attendances?: NexusGenInputs['AttendanceCreateManyWithoutMemberInput'] | null; // AttendanceCreateManyWithoutMemberInput
    birthday?: any | null; // DateTime
    createdAt?: any | null; // DateTime
    dayOfBirth?: number | null; // Int
    email?: string | null; // String
    facebookId?: string | null; // String
    fullName: string; // String!
    gender?: string | null; // String
    groupEnrollments?: NexusGenInputs['GroupEnrollmentCreateManyWithoutProfileInput'] | null; // GroupEnrollmentCreateManyWithoutProfileInput
    id?: string | null; // String
    joinDate?: any | null; // DateTime
    leader?: NexusGenInputs['GroupCreateManyWithoutLeaderInput'] | null; // GroupCreateManyWithoutLeaderInput
    member?: NexusGenInputs['GroupCreateManyWithoutMembersInput'] | null; // GroupCreateManyWithoutMembersInput
    monthOfBirth?: number | null; // Int
    oldId?: string | null; // String
    org?: NexusGenInputs['OrgCreateOneWithoutProfilesInput'] | null; // OrgCreateOneWithoutProfilesInput
    phoneNumber?: string | null; // String
    slug?: string | null; // String
    updatedAt?: any | null; // DateTime
    users?: NexusGenInputs['UserCreateManyWithoutProfileInput'] | null; // UserCreateManyWithoutProfileInput
    yearOfBirth?: number | null; // Int
  }
  ProfileCreateManyWithoutMemberInput: { // input type
    connect?: NexusGenInputs['ProfileWhereUniqueInput'][] | null; // [ProfileWhereUniqueInput!]
    create?: NexusGenInputs['ProfileCreateWithoutMemberInput'][] | null; // [ProfileCreateWithoutMemberInput!]
  }
  ProfileCreateManyWithoutOrgInput: { // input type
    connect?: NexusGenInputs['ProfileWhereUniqueInput'][] | null; // [ProfileWhereUniqueInput!]
    create?: NexusGenInputs['ProfileCreateWithoutOrgInput'][] | null; // [ProfileCreateWithoutOrgInput!]
  }
  ProfileCreateOneWithoutAttendancesInput: { // input type
    connect?: NexusGenInputs['ProfileWhereUniqueInput'] | null; // ProfileWhereUniqueInput
    create?: NexusGenInputs['ProfileCreateWithoutAttendancesInput'] | null; // ProfileCreateWithoutAttendancesInput
  }
  ProfileCreateOneWithoutGroupEnrollmentsInput: { // input type
    connect?: NexusGenInputs['ProfileWhereUniqueInput'] | null; // ProfileWhereUniqueInput
    create?: NexusGenInputs['ProfileCreateWithoutGroupEnrollmentsInput'] | null; // ProfileCreateWithoutGroupEnrollmentsInput
  }
  ProfileCreateOneWithoutLeaderInput: { // input type
    connect?: NexusGenInputs['ProfileWhereUniqueInput'] | null; // ProfileWhereUniqueInput
    create?: NexusGenInputs['ProfileCreateWithoutLeaderInput'] | null; // ProfileCreateWithoutLeaderInput
  }
  ProfileCreateWithoutAttendancesInput: { // input type
    birthday?: any | null; // DateTime
    createdAt?: any | null; // DateTime
    dayOfBirth?: number | null; // Int
    email?: string | null; // String
    facebookId?: string | null; // String
    fullName: string; // String!
    gender?: string | null; // String
    groupEnrollments?: NexusGenInputs['GroupEnrollmentCreateManyWithoutProfileInput'] | null; // GroupEnrollmentCreateManyWithoutProfileInput
    id?: string | null; // String
    joinDate?: any | null; // DateTime
    leader?: NexusGenInputs['GroupCreateManyWithoutLeaderInput'] | null; // GroupCreateManyWithoutLeaderInput
    member?: NexusGenInputs['GroupCreateManyWithoutMembersInput'] | null; // GroupCreateManyWithoutMembersInput
    monthOfBirth?: number | null; // Int
    oldId?: string | null; // String
    org?: NexusGenInputs['OrgCreateOneWithoutProfilesInput'] | null; // OrgCreateOneWithoutProfilesInput
    phoneNumber?: string | null; // String
    slug?: string | null; // String
    updatedAt?: any | null; // DateTime
    users?: NexusGenInputs['UserCreateManyWithoutProfileInput'] | null; // UserCreateManyWithoutProfileInput
    yearOfBirth?: number | null; // Int
  }
  ProfileCreateWithoutGroupEnrollmentsInput: { // input type
    attendances?: NexusGenInputs['AttendanceCreateManyWithoutMemberInput'] | null; // AttendanceCreateManyWithoutMemberInput
    birthday?: any | null; // DateTime
    createdAt?: any | null; // DateTime
    dayOfBirth?: number | null; // Int
    email?: string | null; // String
    facebookId?: string | null; // String
    fullName: string; // String!
    gender?: string | null; // String
    id?: string | null; // String
    joinDate?: any | null; // DateTime
    leader?: NexusGenInputs['GroupCreateManyWithoutLeaderInput'] | null; // GroupCreateManyWithoutLeaderInput
    member?: NexusGenInputs['GroupCreateManyWithoutMembersInput'] | null; // GroupCreateManyWithoutMembersInput
    monthOfBirth?: number | null; // Int
    oldId?: string | null; // String
    org?: NexusGenInputs['OrgCreateOneWithoutProfilesInput'] | null; // OrgCreateOneWithoutProfilesInput
    phoneNumber?: string | null; // String
    slug?: string | null; // String
    updatedAt?: any | null; // DateTime
    users?: NexusGenInputs['UserCreateManyWithoutProfileInput'] | null; // UserCreateManyWithoutProfileInput
    yearOfBirth?: number | null; // Int
  }
  ProfileCreateWithoutLeaderInput: { // input type
    attendances?: NexusGenInputs['AttendanceCreateManyWithoutMemberInput'] | null; // AttendanceCreateManyWithoutMemberInput
    birthday?: any | null; // DateTime
    createdAt?: any | null; // DateTime
    dayOfBirth?: number | null; // Int
    email?: string | null; // String
    facebookId?: string | null; // String
    fullName: string; // String!
    gender?: string | null; // String
    groupEnrollments?: NexusGenInputs['GroupEnrollmentCreateManyWithoutProfileInput'] | null; // GroupEnrollmentCreateManyWithoutProfileInput
    id?: string | null; // String
    joinDate?: any | null; // DateTime
    member?: NexusGenInputs['GroupCreateManyWithoutMembersInput'] | null; // GroupCreateManyWithoutMembersInput
    monthOfBirth?: number | null; // Int
    oldId?: string | null; // String
    org?: NexusGenInputs['OrgCreateOneWithoutProfilesInput'] | null; // OrgCreateOneWithoutProfilesInput
    phoneNumber?: string | null; // String
    slug?: string | null; // String
    updatedAt?: any | null; // DateTime
    users?: NexusGenInputs['UserCreateManyWithoutProfileInput'] | null; // UserCreateManyWithoutProfileInput
    yearOfBirth?: number | null; // Int
  }
  ProfileCreateWithoutMemberInput: { // input type
    attendances?: NexusGenInputs['AttendanceCreateManyWithoutMemberInput'] | null; // AttendanceCreateManyWithoutMemberInput
    birthday?: any | null; // DateTime
    createdAt?: any | null; // DateTime
    dayOfBirth?: number | null; // Int
    email?: string | null; // String
    facebookId?: string | null; // String
    fullName: string; // String!
    gender?: string | null; // String
    groupEnrollments?: NexusGenInputs['GroupEnrollmentCreateManyWithoutProfileInput'] | null; // GroupEnrollmentCreateManyWithoutProfileInput
    id?: string | null; // String
    joinDate?: any | null; // DateTime
    leader?: NexusGenInputs['GroupCreateManyWithoutLeaderInput'] | null; // GroupCreateManyWithoutLeaderInput
    monthOfBirth?: number | null; // Int
    oldId?: string | null; // String
    org?: NexusGenInputs['OrgCreateOneWithoutProfilesInput'] | null; // OrgCreateOneWithoutProfilesInput
    phoneNumber?: string | null; // String
    slug?: string | null; // String
    updatedAt?: any | null; // DateTime
    users?: NexusGenInputs['UserCreateManyWithoutProfileInput'] | null; // UserCreateManyWithoutProfileInput
    yearOfBirth?: number | null; // Int
  }
  ProfileCreateWithoutOrgInput: { // input type
    attendances?: NexusGenInputs['AttendanceCreateManyWithoutMemberInput'] | null; // AttendanceCreateManyWithoutMemberInput
    birthday?: any | null; // DateTime
    createdAt?: any | null; // DateTime
    dayOfBirth?: number | null; // Int
    email?: string | null; // String
    facebookId?: string | null; // String
    fullName: string; // String!
    gender?: string | null; // String
    groupEnrollments?: NexusGenInputs['GroupEnrollmentCreateManyWithoutProfileInput'] | null; // GroupEnrollmentCreateManyWithoutProfileInput
    id?: string | null; // String
    joinDate?: any | null; // DateTime
    leader?: NexusGenInputs['GroupCreateManyWithoutLeaderInput'] | null; // GroupCreateManyWithoutLeaderInput
    member?: NexusGenInputs['GroupCreateManyWithoutMembersInput'] | null; // GroupCreateManyWithoutMembersInput
    monthOfBirth?: number | null; // Int
    oldId?: string | null; // String
    phoneNumber?: string | null; // String
    slug?: string | null; // String
    updatedAt?: any | null; // DateTime
    users?: NexusGenInputs['UserCreateManyWithoutProfileInput'] | null; // UserCreateManyWithoutProfileInput
    yearOfBirth?: number | null; // Int
  }
  ProfileWhereUniqueInput: { // input type
    id?: string | null; // String
    oldId?: string | null; // String
    slug?: string | null; // String
  }
  ScheduleCreateManyWithoutActivityInput: { // input type
    connect?: NexusGenInputs['ScheduleWhereUniqueInput'][] | null; // [ScheduleWhereUniqueInput!]
    create?: NexusGenInputs['ScheduleCreateWithoutActivityInput'][] | null; // [ScheduleCreateWithoutActivityInput!]
  }
  ScheduleCreateOneWithoutAttendancesInput: { // input type
    connect?: NexusGenInputs['ScheduleWhereUniqueInput'] | null; // ScheduleWhereUniqueInput
    create?: NexusGenInputs['ScheduleCreateWithoutAttendancesInput'] | null; // ScheduleCreateWithoutAttendancesInput
  }
  ScheduleCreateWithoutActivityInput: { // input type
    attendances?: NexusGenInputs['AttendanceCreateManyWithoutScheduleInput'] | null; // AttendanceCreateManyWithoutScheduleInput
    date: any; // DateTime!
    id?: string | null; // String
  }
  ScheduleCreateWithoutAttendancesInput: { // input type
    activity: NexusGenInputs['ActivityCreateOneWithoutSchedulesInput']; // ActivityCreateOneWithoutSchedulesInput!
    date: any; // DateTime!
    id?: string | null; // String
  }
  ScheduleWhereUniqueInput: { // input type
    id?: string | null; // String
  }
  UserCreateManyWithoutProfileInput: { // input type
    connect?: NexusGenInputs['UserWhereUniqueInput'][] | null; // [UserWhereUniqueInput!]
    create?: NexusGenInputs['UserCreateWithoutProfileInput'][] | null; // [UserCreateWithoutProfileInput!]
  }
  UserCreateWithoutProfileInput: { // input type
    email: string; // String!
    id?: string | null; // String
    name?: string | null; // String
    password: string; // String!
    permission: number; // Int!
    posts?: NexusGenInputs['PostCreateManyWithoutAuthorInput'] | null; // PostCreateManyWithoutAuthorInput
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    id?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Activity: client.Activity;
  Attendance: client.Attendance;
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Group: client.Group;
  Mutation: {};
  Org: client.Org;
  Post: client.Post;
  Profile: client.Profile;
  Query: {};
  Schedule: client.Schedule;
  User: client.User;
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  ActivityCreateManyWithoutOrgInput: NexusGenInputs['ActivityCreateManyWithoutOrgInput'];
  ActivityCreateOneWithoutSchedulesInput: NexusGenInputs['ActivityCreateOneWithoutSchedulesInput'];
  ActivityCreateWithoutOrgInput: NexusGenInputs['ActivityCreateWithoutOrgInput'];
  ActivityCreateWithoutSchedulesInput: NexusGenInputs['ActivityCreateWithoutSchedulesInput'];
  ActivityWhereUniqueInput: NexusGenInputs['ActivityWhereUniqueInput'];
  AttendanceCreateManyWithoutMemberInput: NexusGenInputs['AttendanceCreateManyWithoutMemberInput'];
  AttendanceCreateManyWithoutScheduleInput: NexusGenInputs['AttendanceCreateManyWithoutScheduleInput'];
  AttendanceCreateWithoutMemberInput: NexusGenInputs['AttendanceCreateWithoutMemberInput'];
  AttendanceCreateWithoutScheduleInput: NexusGenInputs['AttendanceCreateWithoutScheduleInput'];
  AttendanceWhereUniqueInput: NexusGenInputs['AttendanceWhereUniqueInput'];
  GroupCreateInput: NexusGenInputs['GroupCreateInput'];
  GroupCreateManyWithoutLeaderInput: NexusGenInputs['GroupCreateManyWithoutLeaderInput'];
  GroupCreateManyWithoutMembersInput: NexusGenInputs['GroupCreateManyWithoutMembersInput'];
  GroupCreateManyWithoutOrgInput: NexusGenInputs['GroupCreateManyWithoutOrgInput'];
  GroupCreateOneWithoutGroupEnrollmentsInput: NexusGenInputs['GroupCreateOneWithoutGroupEnrollmentsInput'];
  GroupCreateWithoutGroupEnrollmentsInput: NexusGenInputs['GroupCreateWithoutGroupEnrollmentsInput'];
  GroupCreateWithoutLeaderInput: NexusGenInputs['GroupCreateWithoutLeaderInput'];
  GroupCreateWithoutMembersInput: NexusGenInputs['GroupCreateWithoutMembersInput'];
  GroupCreateWithoutOrgInput: NexusGenInputs['GroupCreateWithoutOrgInput'];
  GroupEnrollmentCreateManyWithoutGroupInput: NexusGenInputs['GroupEnrollmentCreateManyWithoutGroupInput'];
  GroupEnrollmentCreateManyWithoutProfileInput: NexusGenInputs['GroupEnrollmentCreateManyWithoutProfileInput'];
  GroupEnrollmentCreateWithoutGroupInput: NexusGenInputs['GroupEnrollmentCreateWithoutGroupInput'];
  GroupEnrollmentCreateWithoutProfileInput: NexusGenInputs['GroupEnrollmentCreateWithoutProfileInput'];
  GroupEnrollmentWhereUniqueInput: NexusGenInputs['GroupEnrollmentWhereUniqueInput'];
  GroupWhereUniqueInput: NexusGenInputs['GroupWhereUniqueInput'];
  OrgCreateOneWithoutActivitiesInput: NexusGenInputs['OrgCreateOneWithoutActivitiesInput'];
  OrgCreateOneWithoutGroupsInput: NexusGenInputs['OrgCreateOneWithoutGroupsInput'];
  OrgCreateOneWithoutProfilesInput: NexusGenInputs['OrgCreateOneWithoutProfilesInput'];
  OrgCreateWithoutActivitiesInput: NexusGenInputs['OrgCreateWithoutActivitiesInput'];
  OrgCreateWithoutGroupsInput: NexusGenInputs['OrgCreateWithoutGroupsInput'];
  OrgCreateWithoutProfilesInput: NexusGenInputs['OrgCreateWithoutProfilesInput'];
  OrgWhereUniqueInput: NexusGenInputs['OrgWhereUniqueInput'];
  PostCreateManyWithoutAuthorInput: NexusGenInputs['PostCreateManyWithoutAuthorInput'];
  PostCreateWithoutAuthorInput: NexusGenInputs['PostCreateWithoutAuthorInput'];
  PostWhereUniqueInput: NexusGenInputs['PostWhereUniqueInput'];
  ProfileCreateInput: NexusGenInputs['ProfileCreateInput'];
  ProfileCreateManyWithoutMemberInput: NexusGenInputs['ProfileCreateManyWithoutMemberInput'];
  ProfileCreateManyWithoutOrgInput: NexusGenInputs['ProfileCreateManyWithoutOrgInput'];
  ProfileCreateOneWithoutAttendancesInput: NexusGenInputs['ProfileCreateOneWithoutAttendancesInput'];
  ProfileCreateOneWithoutGroupEnrollmentsInput: NexusGenInputs['ProfileCreateOneWithoutGroupEnrollmentsInput'];
  ProfileCreateOneWithoutLeaderInput: NexusGenInputs['ProfileCreateOneWithoutLeaderInput'];
  ProfileCreateWithoutAttendancesInput: NexusGenInputs['ProfileCreateWithoutAttendancesInput'];
  ProfileCreateWithoutGroupEnrollmentsInput: NexusGenInputs['ProfileCreateWithoutGroupEnrollmentsInput'];
  ProfileCreateWithoutLeaderInput: NexusGenInputs['ProfileCreateWithoutLeaderInput'];
  ProfileCreateWithoutMemberInput: NexusGenInputs['ProfileCreateWithoutMemberInput'];
  ProfileCreateWithoutOrgInput: NexusGenInputs['ProfileCreateWithoutOrgInput'];
  ProfileWhereUniqueInput: NexusGenInputs['ProfileWhereUniqueInput'];
  ScheduleCreateManyWithoutActivityInput: NexusGenInputs['ScheduleCreateManyWithoutActivityInput'];
  ScheduleCreateOneWithoutAttendancesInput: NexusGenInputs['ScheduleCreateOneWithoutAttendancesInput'];
  ScheduleCreateWithoutActivityInput: NexusGenInputs['ScheduleCreateWithoutActivityInput'];
  ScheduleCreateWithoutAttendancesInput: NexusGenInputs['ScheduleCreateWithoutAttendancesInput'];
  ScheduleWhereUniqueInput: NexusGenInputs['ScheduleWhereUniqueInput'];
  UserCreateManyWithoutProfileInput: NexusGenInputs['UserCreateManyWithoutProfileInput'];
  UserCreateWithoutProfileInput: NexusGenInputs['UserCreateWithoutProfileInput'];
  UserWhereUniqueInput: NexusGenInputs['UserWhereUniqueInput'];
}

export interface NexusGenFieldTypes {
  Activity: { // field return type
    id: string; // String!
    name: string; // String!
    schedules: NexusGenRootTypes['Schedule'][]; // [Schedule!]!
    slug: string; // String!
  }
  Attendance: { // field return type
    createdAt: any; // DateTime!
    id: string; // String!
    member: NexusGenRootTypes['Profile']; // Profile!
    present: boolean; // Boolean!
    schedule: NexusGenRootTypes['Schedule']; // Schedule!
    status: string; // String!
  }
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Group: { // field return type
    id: string; // String!
    leader: NexusGenRootTypes['Profile'] | null; // Profile
    members: NexusGenRootTypes['Profile'][]; // [Profile!]!
    name: string; // String!
  }
  Mutation: { // field return type
    createDraft: NexusGenRootTypes['Post']; // Post!
    createGroup: NexusGenRootTypes['Group']; // Group!
    createProfile: NexusGenRootTypes['Profile']; // Profile!
    deletePost: NexusGenRootTypes['Post'] | null; // Post
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    publish: NexusGenRootTypes['Post'] | null; // Post
    signup: NexusGenRootTypes['AuthPayload']; // AuthPayload!
  }
  Org: { // field return type
    activities: NexusGenRootTypes['Activity'][]; // [Activity!]!
    groups: NexusGenRootTypes['Group'][]; // [Group!]!
    id: string; // String!
    name: string; // String!
  }
  Post: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    content: string | null; // String
    id: string; // String!
    published: boolean; // Boolean!
    title: string; // String!
  }
  Profile: { // field return type
    birthday: any | null; // DateTime
    email: string | null; // String
    facebookId: string | null; // String
    fullName: string; // String!
    gender: string | null; // String
    id: string; // String!
    joinDate: any | null; // DateTime
    oldId: string | null; // String
    phoneNumber: string | null; // String
  }
  Query: { // field return type
    activities: NexusGenRootTypes['Activity'][]; // [Activity!]!
    attendances: NexusGenRootTypes['Attendance'][]; // [Attendance!]!
    feed: NexusGenRootTypes['Post'][]; // [Post!]!
    filterPosts: NexusGenRootTypes['Post'][]; // [Post!]!
    groups: NexusGenRootTypes['Group'][]; // [Group!]!
    me: NexusGenRootTypes['User'] | null; // User
    membersInGroup: NexusGenRootTypes['Profile'][]; // [Profile!]!
    post: NexusGenRootTypes['Post'] | null; // Post
    profiles: NexusGenRootTypes['Profile'][]; // [Profile!]!
    schedules: NexusGenRootTypes['Schedule'][]; // [Schedule!]!
  }
  Schedule: { // field return type
    activity: NexusGenRootTypes['Activity']; // Activity!
    attendances: NexusGenRootTypes['Attendance'][]; // [Attendance!]!
    date: any; // DateTime!
    id: string; // String!
  }
  User: { // field return type
    email: string; // String!
    id: string; // String!
    name: string | null; // String
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    profile: NexusGenRootTypes['Profile'] | null; // Profile
  }
}

export interface NexusGenArgTypes {
  Activity: {
    schedules: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  Group: {
    members: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  Mutation: {
    createDraft: { // args
      content?: string | null; // String
      title: string; // String!
    }
    createGroup: { // args
      data: NexusGenInputs['GroupCreateInput']; // GroupCreateInput!
    }
    createProfile: { // args
      data: NexusGenInputs['ProfileCreateInput']; // ProfileCreateInput!
    }
    deletePost: { // args
      id?: string | null; // ID
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    publish: { // args
      id?: string | null; // ID
    }
    signup: { // args
      email: string; // String!
      name?: string | null; // String
      password: string; // String!
    }
  }
  Org: {
    activities: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    groups: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  Query: {
    activities: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    attendances: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    filterPosts: { // args
      searchString?: string | null; // String
    }
    groups: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    post: { // args
      id?: string | null; // ID
    }
    profiles: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    schedules: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  Schedule: {
    attendances: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Activity" | "Attendance" | "AuthPayload" | "Group" | "Mutation" | "Org" | "Post" | "Profile" | "Query" | "Schedule" | "User";

export type NexusGenInputNames = "ActivityCreateManyWithoutOrgInput" | "ActivityCreateOneWithoutSchedulesInput" | "ActivityCreateWithoutOrgInput" | "ActivityCreateWithoutSchedulesInput" | "ActivityWhereUniqueInput" | "AttendanceCreateManyWithoutMemberInput" | "AttendanceCreateManyWithoutScheduleInput" | "AttendanceCreateWithoutMemberInput" | "AttendanceCreateWithoutScheduleInput" | "AttendanceWhereUniqueInput" | "GroupCreateInput" | "GroupCreateManyWithoutLeaderInput" | "GroupCreateManyWithoutMembersInput" | "GroupCreateManyWithoutOrgInput" | "GroupCreateOneWithoutGroupEnrollmentsInput" | "GroupCreateWithoutGroupEnrollmentsInput" | "GroupCreateWithoutLeaderInput" | "GroupCreateWithoutMembersInput" | "GroupCreateWithoutOrgInput" | "GroupEnrollmentCreateManyWithoutGroupInput" | "GroupEnrollmentCreateManyWithoutProfileInput" | "GroupEnrollmentCreateWithoutGroupInput" | "GroupEnrollmentCreateWithoutProfileInput" | "GroupEnrollmentWhereUniqueInput" | "GroupWhereUniqueInput" | "OrgCreateOneWithoutActivitiesInput" | "OrgCreateOneWithoutGroupsInput" | "OrgCreateOneWithoutProfilesInput" | "OrgCreateWithoutActivitiesInput" | "OrgCreateWithoutGroupsInput" | "OrgCreateWithoutProfilesInput" | "OrgWhereUniqueInput" | "PostCreateManyWithoutAuthorInput" | "PostCreateWithoutAuthorInput" | "PostWhereUniqueInput" | "ProfileCreateInput" | "ProfileCreateManyWithoutMemberInput" | "ProfileCreateManyWithoutOrgInput" | "ProfileCreateOneWithoutAttendancesInput" | "ProfileCreateOneWithoutGroupEnrollmentsInput" | "ProfileCreateOneWithoutLeaderInput" | "ProfileCreateWithoutAttendancesInput" | "ProfileCreateWithoutGroupEnrollmentsInput" | "ProfileCreateWithoutLeaderInput" | "ProfileCreateWithoutMemberInput" | "ProfileCreateWithoutOrgInput" | "ProfileWhereUniqueInput" | "ScheduleCreateManyWithoutActivityInput" | "ScheduleCreateOneWithoutAttendancesInput" | "ScheduleCreateWithoutActivityInput" | "ScheduleCreateWithoutAttendancesInput" | "ScheduleWhereUniqueInput" | "UserCreateManyWithoutProfileInput" | "UserCreateWithoutProfileInput" | "UserWhereUniqueInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}