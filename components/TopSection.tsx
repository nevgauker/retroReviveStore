import Image from "next/image"

export function TopSection() {
    return (
        <header className="relative h-24 w-full border-b border-red-500 shadow-md overflow-hidden">
            {/* Background */}
            <Image
                src="/RetroRevive_background.jpg"
                alt="store background"
                fill
                className="object-cover"
                priority
            />

            {/* Content container */}
            <div className="relative z-10 flex items-center justify-between h-full px-6">
                {/* Logo */}
                <Image
                    src="/RetroRevive_logo.png"
                    alt="store logo"
                    width={80}
                    height={80}
                    className="object-contain"
                />

                {/* Text */}
                <Image
                    src="/RetroRevive_text.png"
                    alt="store name"
                    width={140}
                    height={80}
                    className="object-contain"
                />
            </div>
        </header>
    )
}
