import { useEffect, useLayoutEffect } from 'react';
import { isBrowser } from './utils/util';

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
