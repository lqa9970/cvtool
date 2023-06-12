import { useNavigate } from 'react-router-dom';

type INavigate = {}

export const Navigate = async (path: string) => {
  const navigate = useNavigate();
  return navigate(path);
};
