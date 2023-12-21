import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useCompleteTasks = () => {
    const {user} = useContext(AuthContext);
    console.log(user?.email);
    const axiosSecure = useAxiosSecure()
    const { data: completeTasks = [],refetch } = useQuery({
        queryKey: ['completeTasks', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/completedTasks/${user?.email}`)
            return res.data;
        }
    })
    return [completeTasks, refetch];
};

export default useCompleteTasks;