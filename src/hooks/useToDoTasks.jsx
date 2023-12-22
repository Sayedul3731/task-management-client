import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider/AuthProvider';

const useToDoTasks = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const { data: toDoTasks = [],refetch } = useQuery({
        queryKey: ['toDoTasks', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/toDoTasks/${user?.email}`)
            return res.data;
        }
    })
    return [toDoTasks, refetch];
};

export default useToDoTasks;