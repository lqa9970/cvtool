import { useNavigate } from "react-router-dom";

export const Navigate = (path: string) => {
  const navigate = useNavigate();
  return navigate(path);
};
