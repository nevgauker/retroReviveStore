function AboutPage() {
    return (
        <div className="min-h-screen py-10 bg-gray-100 flex items-center">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>

                <p className="text-gray-700 mb-4">
                    Welcome to Retro Revive! We are a digital marketplace dedicated to providing high-quality digital assets such as image bundles, templates, and other creative resources for professionals and enthusiasts alike.
                </p>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h2>
                    <p className="text-gray-700">
                        Our mission is to empower creators by offering carefully curated digital assets that save time and enhance their work. Whether you are a designer, photographer, or digital marketer, we are here to provide you with resources that elevate your projects and streamline your creative workflow.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">What We Offer</h2>
                    <p className="text-gray-700">
                        Our store specializes in bundles that are easy to download and access anytime. We believe in simplicity and convenience, and our digital assets are designed with these values in mind. From image bundles to templates, each product is carefully crafted and stored for instant access.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Why Choose Us?</h2>
                    <p className="text-gray-700">
                        At Retro Revive, we prioritize quality, security, and user satisfaction. Your purchase is linked directly to your email, ensuring easy access to your products at any time without unnecessary personal data collection. We are committed to building a trusted marketplace that respects your privacy and meets your creative needs.
                    </p>
                </section>

                <footer className="text-gray-600 mt-8 text-sm">
                    <p>&copy; {new Date().getFullYear()} Retro Revive. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default AboutPage;
