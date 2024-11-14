'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function ClientPopup() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const popupShown = Cookies.get('popupShown');
        if (popupShown) setIsVisible(false); // Hide if cookie is set
    }, []);

    const handleClose = () => {
        Cookies.set('popupShown', 'true', { expires: 30 }); // Set cookie for 30 days
        setIsVisible(false); // Hide the pop-up
    };

    if (!isVisible) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-6 rounded-lg relative max-w-md w-full'>
                <Image src='/popup-image.jpg' alt='Special Offer' width={500} height={300} objectFit='contain' />
                <Button onClick={handleClose} className='mt-4 w-full'>
                    Dismiss
                </Button>
            </div>
        </div>
    );
}
