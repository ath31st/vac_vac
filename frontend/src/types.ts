export interface TagType {
  id: string;
  name: string;
}

export interface EnglishGradeLvlsType {
  id: number;
  name: string;
}

export interface GradeType {
  id: number;
  name: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface VacancyData {
  id: string;
  title: string;
  description: string;
  isVisible: boolean;
  hasResponded: boolean;
  responseCount: number;
  creatorId: string;
  englishLevel: string;
  grade: string;
  tags: TagType[];
}
