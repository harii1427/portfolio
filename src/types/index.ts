export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  details: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}