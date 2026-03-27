import { useAuth } from '../../hooks/useAuth';

export const Header = ({ title, subtitle, rightElement }) => {
  const { signOut } = useAuth();

  return (
    <div className="bg-primary text-white p-6 rounded-b-3xl shadow-md mb-6 relative">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-green-100 mt-1">{subtitle}</p>}
        </div>
        <div className="flex gap-2">
          {rightElement}
          <button 
            onClick={signOut}
            className="p-2 bg-green-800 rounded-xl hover:bg-green-900 transition-colors"
            aria-label="Sign out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
