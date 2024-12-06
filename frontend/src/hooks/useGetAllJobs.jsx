import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector(store => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get${searchedQuery ? `?keyword=${searchedQuery}` : ''}`, 
          // { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error('Login Error:', error.response?.data || error.message);
      }
    };
    fetchAllJobs();
  }, [searchedQuery, dispatch]); // Add searchedQuery and dispatch to dependency array
};

export default useGetAllJobs;
