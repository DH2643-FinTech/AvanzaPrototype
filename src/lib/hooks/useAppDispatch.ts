import {useDispatch} from 'react-redux';
import type {AppDispatch} from '@/src/lib/store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();