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
  languages?: Languages[];
  skills?: Skills[];
  workabroad?: boolean;
  experience_level?: string;
  projects?: Project[];
  reminders?: Reminders[];
  last_activity?: string[];
  education?: Education[];
}
