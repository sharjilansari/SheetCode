import React, { ReactNode, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import getCookie from '../../utils/getCookie';
import { setAuth } from '../../features/counter/authSlice';
import { LocalStorage } from '../../utils/saveToLocalStorage';

interface LockedSectionProps {
  // isAuthenticated: boolean;
  children: ReactNode;
}

const LockedSection: React.FC<LockedSectionProps> = ({children }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const storage = new LocalStorage();

  useEffect(() => {
    const token = getCookie("accessToken");
    const userData = storage.getFromLocalStorage("userData");
    if (token && !isAuthenticated && userData) {
      dispatch(setAuth(true));
    }
  }, [dispatch, isAuthenticated]);
  // console.log(isAuthenticated);
  return (
    <div className="relative">
      {/* Main content */}
      <div className={`transition-all duration-300 ${!isAuthenticated ? 'blur-[1px] select-none pointer-events-none' : ''}`}>
        {children}
      </div>

      {/* Overlay lock */}
      {!isAuthenticated && (
        <div className="absolute inset-0 backdrop-blur-[1px] flex items-center justify-center z-10">
          <div className="text-center px-4">
            <Lock className="mx-auto h-10 w-10 text-white mb-4" />
            <p className="text-white text-lg font-medium">Please sign up/log in to access this section</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LockedSection;
