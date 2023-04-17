import {useNavigate} from 'react-router-dom';

interface INavigate{
}

export const Navigate = async (path: string) =>{
    const navigate = useNavigate();
    return navigate(path)
}