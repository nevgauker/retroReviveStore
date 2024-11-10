

function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen py-10 bg-gray-100">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
                <p className="text-gray-600 mb-4">
                    This Privacy Policy outlines how [Your Store Name] (“we,” “our,” or “us”) collects, uses, stores, and protects your personal information when you use our online store (“Store”). By using the Store, you consent to the practices described in this policy.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">1. Information We Collect</h2>
                    <p className="text-gray-600">
                        We collect only the essential information needed to provide you with our digital products. This includes your email address, which is required to access and manage your purchases. No other personal information, such as name or payment details, is stored by us directly.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">2. How We Use Your Information</h2>
                    <p className="text-gray-600">
                        Your email address is used to identify your account and grant access to your purchased digital assets. We may occasionally use this email to send important updates related to your purchases, such as download notifications or updates to our Terms or Privacy Policy.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">3. Data Storage and Security</h2>
                    <p className="text-gray-600">
                        We take appropriate security measures to protect your email address and purchase history. Data is stored securely, and we utilize encryption and access control to safeguard it. We do not retain any payment information as all transactions are handled by our secure third-party payment processor.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">4. Sharing Your Information</h2>
                    <p className="text-gray-600">
                        We do not share, sell, or trade your personal information with third parties, except as necessary to process your payment through our trusted payment partners or comply with legal obligations.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">5. Your Rights</h2>
                    <p className="text-gray-600">
                        You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights or have any questions about your data, please contact us at [Contact Email].
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">6. Cookies and Tracking</h2>
                    <p className="text-gray-600">
                        Our Store does not use cookies or tracking technologies for personalized advertising or analytics. However, essential cookies may be used by our payment processors to facilitate transactions securely.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">7. Changes to This Privacy Policy</h2>
                    <p className="text-gray-600">
                        We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page, and we encourage you to review it periodically. Your continued use of the Store after any changes constitutes acceptance of the new Privacy Policy.
                    </p>
                </section>

                <footer className="text-gray-600 mt-10 text-sm">
                    <p>Last Updated: 10/11/2024</p>
                    <p>&copy; {new Date().getFullYear()} Retro Revive. All Rights Reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
