import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const usePersonalTasks = () => {
    const {user} = useContext(AuthContext);
    console.log(user?.email);
    const axiosSecure = useAxiosSecure()
    const { data: personalTasks = [],refetch } = useQuery({
        queryKey: ['personalTasks', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/personalTasks/${user?.email}`)
            return res.data;
        }
    })
    return [personalTasks, refetch];
};

export default usePersonalTasks;