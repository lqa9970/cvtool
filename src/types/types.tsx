import { ChangeEvent } from "react";
import { Timestamp } from "firebase/firestore";

export type OktaTokenPayload = {
  sub: string;
  email: string;
  name: string;
  preferred_username: string;
  auth_time: string;
};

export type Role = {
  id: string;
  name: string;
};

export type SocialLinks = {
  github: string;
  linkedin: string;
  website: string;
};

export type Languages = {
  id: string;
  name: string;
  nativeName: string;
  prefix: string;
};

export type Skill = {
  id: string;
  name: string;
};

export type UserTechSkill = {
  id: string;
  name: string;
  experience: number;
};

export type ProjectHistory = {
  accountName: string;
  currentlyInProject: boolean;
  endMonthYear: string;
  id: string;
  industry: string;
  projectDescription: string;
  projectTitle: string;
  role: string;
  startMonthYear: string;
  skills: Skill[];
};

export type Industry = {
  id: string;
  name: string;
};

export type Reminders = {
  title: string;
  datetime: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  startMonthYear: string;
  endMonthYear: string;
  degreeDescription: string;
};

export type LanguagesWithProficiency = {
  name: string;
  proficiency: string;
};

export type Certification = {
  validFrom: string;
  validTo: string;
  id: string;
  name: string;
};

export type IActivity = {
  message: string;
  date: Timestamp;
};

export type EmployeeUser = {
  id?: string;
  name: string;
  email?: string;
  location?: string;
  job_title?: string;
  manager_name?: string;
  manager_email?: string;
  nationality?: string;
  main_tech?: string;
  phone_number?: string;
  roles: Role[];
  social_links?: SocialLinks;
  bio?: string;
  languages?: LanguagesWithProficiency[];
  tech_skills?: UserTechSkill[];
  soft_skills?: Skill[];
  // this skills field is deprecated but keeping for now because it will break search otherwise, need new test_users collection with updated user model
  skills?: UserTechSkill[];
  workabroad?: boolean;
  experience_level?: string;
  projects?: ProjectHistory[];
  reminders?: Reminders[];
  last_activity?: string[];
  education?: Education[];
  certifications?: Certification[];
  last_cv_update?: Timestamp;
  activity?: IActivity[];
};

export type FormikHandleChange = {
  (error: ChangeEvent<unknown>): void;
  <T = ChangeEvent<unknown> | string>(field: T): T extends ChangeEvent<unknown>
    ? undefined
    : (error: ChangeEvent<unknown> | string) => void;
};

export type Filters = {
  hyperscaler: string[];
  mainTech: string[];
  skills: string[];
  certificate: string[];
  location: string[];
  languages: string[];
  nationality: string[];
};
export type PdfOptions = {
  languages: string[];
  tech_skills: string[];
  projects: string[];
  education: string[];
  certifications: string[];
  soft_skills: string[];
  name: boolean;
  email: boolean;
  location: boolean;
  job_title: boolean;
  manager_name: boolean;
  manager_email: boolean;
  nationality: boolean;
  main_tech: boolean;
  phone_number: boolean;
  social_links: boolean;
  bio: boolean;
  workabroad: boolean;
  experience_level: boolean;
};

export type UserTableItem = {
  key: string | undefined;
  text: string;
  value: string;
  email?: string;
  roles?: string;
};