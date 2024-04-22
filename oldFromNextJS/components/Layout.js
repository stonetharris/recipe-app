// components/Layout.js
import React from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
    return (
        <>
            {/* Navigation and header code here */}
            <main>{children}</main>
            {/* Footer code here */}
        </>
    );
};

export default Layout;
