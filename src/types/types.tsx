import { ChangeEvent } from 'react';

export type OktaTokenPayload = {
  sub: string;
  email: string;
  name: string;
  preferred_username: string;
  auth_time: string;
}

export type Role = {
  id: string;
  name: string;
}

export type SocialLinks = {
  github: string;
  linkedin: string;
  website: string;
}

export type Languages = {
  id: string;
  name: string;
  nativeName: string;
  prefix: string;
}

export type Skills = {
  id: string;
  name: string;
}

export type ProjectHistory = {
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

export type Reminders = {
  title: string;
  datetime: string;
}

export type Education = {
  id: string;
  school: string;
  degree: string;
  startMonthYear: string;
  endMonthYear: string;
  degreeDescription: string;
}

export type LanguagesWithProficiency = {
  name: string;
  proficiency: string;
}

export type Certifications = {
  name: string;
  date: string;
}

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
  <T = ChangeEvent<any> | string>(field: T): T extends ChangeEvent<any>
    ? void
    : (e: ChangeEvent<any> | string) => void;
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
