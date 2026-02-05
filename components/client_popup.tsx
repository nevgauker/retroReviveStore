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
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 px-4'>
            <div className='relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-white shadow-2xl'>
                <div className='relative h-48 w-full'>
                    <Image
                        src='/popup-image.jpg'
                        alt='Limited drop preview'
                        fill
                        className='object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent' />
                    <div className='absolute bottom-4 left-4 space-y-1 text-white'>
                        <p className='text-xs font-semibold uppercase tracking-[0.3em]'>Limited drop</p>
                        <p className='text-xl font-semibold'>Collectors bundle, 40% off</p>
                    </div>
                </div>
                <div className='space-y-4 p-6'>
                    <p className='text-sm text-muted-foreground'>
                        Unlock exclusive retro textures, posters, and icon sets. Available for a
                        short window.
                    </p>
                    <div className='flex flex-col gap-3 sm:flex-row'>
                        <Button className='w-full sm:w-auto' asChild>
                            <a href="/products">Shop the drop</a>
                        </Button>
                        <Button
                            variant='secondary'
                            onClick={handleClose}
                            className='w-full sm:w-auto'
                        >
                            Maybe later
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
