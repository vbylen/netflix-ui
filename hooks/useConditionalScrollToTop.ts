import { useRef } from 'react';
import { useScrollToTop } from '@react-navigation/native';

export function useConditionalScrollToTop(ref: React.RefObject<any>) {
    try {
        useScrollToTop(ref);
    } catch (error) {
        // Silently handle navigation context errors
    }
} 