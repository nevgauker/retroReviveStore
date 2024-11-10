// components/Footer.tsx

import React from 'react';
import Link from 'next/link';

function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-200 py-6 w-screen">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                {/* Logo or Brand Name */}
                <div className="mb-4 md:mb-0">
                    <h1 className="text-lg font-bold">Retro Revive</h1>
                </div>

                {/* Links Section */}
                <div className="flex space-x-6 mb-4 md:mb-0">
                    <Link href="/about">
                        About
                    </Link>
                    <Link href="/contact">
                        Contact
                    </Link>
                    <Link href="/terms">
                        Terms of Use
                    </Link>
                    <Link href="/privacy">
                        Privacy Policy
                    </Link>
                </div>

                {/* Copyright Section */}
                <div className="text-sm">
                    <p>&copy; {new Date().getFullYear()} Retro Revive. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
