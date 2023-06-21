import { ChangeEvent } from "react";

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

export type Skills = {
  id: string;
  name: string;
};

// No need to refactor now. keep the both types
export type Skill = {
  id: string;
  tech: string;
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

export type Certifications = {
  validFrom?: any ;
  validTo?: any;
  id?:string;
  name: string;
  date?: string;
};

export type EmployeeUser = {
  id?: string;
  name?: string;
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
  skills?: Skill[];
  workabroad?: boolean;
  experience_level?: string;
  projects?: ProjectHistory[];
  reminders?: Reminders[];
  last_activity?: string[];
  education?: Education[];
  certifications?: Certifications[];
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


