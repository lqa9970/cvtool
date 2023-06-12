import { ChangeEvent } from 'react';

export interface OktaTokenPayload {
  sub: string;
  email: string;
  name: string;
  preferred_username: string;
  auth_time: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  website: string;
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

export interface ProjectHistory {
  accountName: string;
  currentlyInProject: string;
  endMonthYear: string;
  id: string;
  industry: string;
  projectDescription: string;
  projectTitle: string;
  role: string;
  startMonthYear: string;
}

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

export interface Certifications {
  name: string;
  date: string;
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
  roles: Role[];
  social_links?: SocialLinks;
  bio?: string;
  languages?: LanguagesWithProficiency[];
  skills?: Skills[];
  workabroad?: boolean;
  experience_level?: string;
  projects?: ProjectHistory[];
  reminders?: Reminders[];
  last_activity?: string[];
  education?: Education[];
  certifications?: Certifications[];
}

export type FormikHandleChange = {
  (e: ChangeEvent<any>): void;
  <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
    ? void
    : (e: string | ChangeEvent<any>) => void;
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
