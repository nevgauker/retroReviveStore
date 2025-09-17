import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-12">
            {/* Full width background */}
            <div className="w-full">
                {/* Centered content */}
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Logo & Brand */}
                        <div className="flex flex-col items-start space-y-4">
                            <div className="flex items-center space-x-2">
                                <Image
                                    src="/RetroRevive_logo.png"
                                    alt="Retro Revive logo"
                                    width={40}
                                    height={40}
                                />
                                <span className="text-xl font-bold tracking-wide text-white">
                                    Retro Revive
                                </span>
                            </div>
                            <p className="text-sm text-gray-400">
                                Bringing vintage vibes back to life. Shop the latest curated
                                retro finds and timeless styles.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="flex flex-col space-y-3">
                            <h2 className="text-lg font-semibold text-white">Quick Links</h2>
                            <nav className="flex flex-col space-y-2 text-sm">
                                <Link href="/about" className="hover:text-white">
                                    About
                                </Link>
                                <Link href="/contact" className="hover:text-white">
                                    Contact
                                </Link>
                                <Link href="/terms" className="hover:text-white">
                                    Terms of Use
                                </Link>
                                <Link href="/privacy" className="hover:text-white">
                                    Privacy Policy
                                </Link>
                            </nav>
                        </div>

                        {/* Newsletter or Socials */}
                        <div className="flex flex-col space-y-3">
                            <h2 className="text-lg font-semibold text-white">Stay Connected</h2>
                            <p className="text-sm text-gray-400">
                                Subscribe to our newsletter for exclusive offers & retro drops.
                            </p>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-l-md px-3 py-2 text-gray-900 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-red-500 px-4 py-2 rounded-r-md text-white hover:bg-red-600 transition"
                                >
                                    Subscribe
                                </button>
                            </form>
                            <div className="flex space-x-4 mt-3">
                                <Link href="#" aria-label="Instagram" className="hover:text-white">
                                    <i className="fab fa-instagram"></i>
                                </Link>
                                <Link href="#" aria-label="Twitter" className="hover:text-white">
                                    <i className="fab fa-twitter"></i>
                                </Link>
                                <Link href="#" aria-label="Facebook" className="hover:text-white">
                                    <i className="fab fa-facebook"></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Retro Revive. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
