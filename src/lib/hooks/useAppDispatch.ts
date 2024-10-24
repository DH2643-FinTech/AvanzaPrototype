// TODO: this file is moved to store - it should be removed in the future
import {useDispatch} from 'react-redux';
import type {AppDispatch} from '@/src/lib/store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();