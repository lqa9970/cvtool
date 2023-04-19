import * as Yup from 'yup';
import { Education } from '../../types/types';

export const defaultStartDate = new Date('1/1/1970');
export const defaultEndDate = new Date('31/12/1970');

export const educationSchema = Yup.object().shape({
  id: Yup.string().required(),
  school: Yup.string().min(4, 'Too Short').required('Required'),
  degree: Yup.string().min(4, 'Too Short!').required('Required'),
  startMonthYear: Yup.string().required(),
  endMonthYear: Yup.string().required(),
  degreeDescription: Yup.string().required()
});

export const uniqueIdGenerator = () => {
  const timestamp = Date.now().toString(16);
  const randomStr = Math.random().toString(16).substring(2, 6);
  const uuid = `${timestamp}-${randomStr}`;
  return uuid;
};

export const initialValues: Education = {
  id: uniqueIdGenerator(),
  school: '',
  degree: '',
  startMonthYear: '09/09/2016',
  endMonthYear: '10/09/2023',
  degreeDescription: ''
};

export const formatDate = (date: Date) => {
  const d = new Date(date);
  const formattedDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  return formattedDate;
};
