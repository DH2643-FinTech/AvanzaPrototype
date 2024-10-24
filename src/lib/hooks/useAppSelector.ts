// TODO: this file is moved to store - it should be removed in the future
import {useSelector, TypedUseSelectorHook} from 'react-redux';
import type {RootState} from '@/src/lib/store/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;