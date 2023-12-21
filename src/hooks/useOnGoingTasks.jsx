import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useOnGoingTasks = () => {
    const {user} = useContext(AuthContext);
    console.log(user?.email);
    const axiosSecure = useAxiosSecure()
    const { data: onGoingTasks = [],refetch } = useQuery({
        queryKey: ['onGoingTasks', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/onGoingTasks/${user?.email}`)
            return res.data;
        }
    })
    return [onGoingTasks, refetch];
};

export default useOnGoingTasks;