import * as Yup from 'yup';
import { ProjectHistory } from '../../types/types';
import { uniqueIdGenerator } from '../../utils/uid';

export const defaultStartDate = new Date('1/1/2015');
export const defaultEndDate = new Date('31/12/2020');

export const projectHistorySchema = Yup.object().shape({
  id: Yup.string().required(),
  role: Yup.string().min(4, 'Too Short').required('Required'),
  projectTitle: Yup.string().min(4, 'Too Short!').required('Required'),
  startMonthYear: Yup.string().required(),
  endMonthYear: Yup.string().required(),
  currentlyInProject: Yup.boolean(),
  projectDescription: Yup.string().required(),
  accountName: Yup.string(),
  industry: Yup.string()
});

export const initialValues: ProjectHistory = {
  id: uniqueIdGenerator(),
  role: '',
  projectTitle: '',
  startMonthYear: '09-09-2016',
  endMonthYear: '10-09-2023',
  currentlyInProject: false,
  projectDescription: '',
  accountName: '',
  industry: ''
};

export const formatDate = (date: Date) => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};
