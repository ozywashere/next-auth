import React from 'react';

const AuthLayout = ({children}) => {
    return (
        <div
            className="flex h-full flex-col items-center justify-center p-24 bg-gradient-to-r from-cyan-500 to-blue-500">
            {children}
        </div>
    );
};

export default AuthLayout;