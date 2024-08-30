import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set) => ({
            isStudentLoggedIn: false,
            isCounsellorLoggedIn: false,
            counsellorData: null,
            setIsStudentLoggedIn: (status) => set({ isStudentLoggedIn: status }),
            setIsCounsellorLoggedIn: (status) => set({ isCounsellorLoggedIn: status }),
            setCounsellorData: (data) => set({counsellorData: data})
        }),
        {
            name: 'auth-storage', // key in localStorage
            getStorage: () => localStorage, // use localStorage
        }
    )
);

export default useStore;
