import { ChangeEvent } from 'react';

export interface OktaTokenPayload {
  sub: string;
  email: string;
  name: string;
  preferred_username: string;
  auth_time: string;
}

export interface Roles {
  id: string;
  name: string;
}

export interface SocialLinks {
  name: string;
  url: string;
}

export interface Languages {
  id: string;
  name: string;
  nativeName: string;
  prefix: string;
}

export interface Skills {
  id: string;
  name: string;
}

export interface Project {}

export interface Reminders {
  title: string;
  datetime: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  startMonthYear: string;
  endMonthYear: string;
  degreeDescription: string;
}

export interface LanguagesWithProficiency {
  name: string;
  proficiency: string;
}

export interface EmployeeUser {
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
  roles?: Roles[];
  social_links?: SocialLinks[];
  bio?: string;
  languages?: LanguagesWithProficiency[];
  skills?: Skills[];
  workabroad?: boolean;
  experience_level?: string;
  projects?: Project[];
  reminders?: Reminders[];
  last_activity?: string[];
  education?: Education[];
}

export type FormikHandleChange = {
  (e: ChangeEvent<any>): void;
  <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
    ? void
    : (e: string | ChangeEvent<any>) => void;
};
