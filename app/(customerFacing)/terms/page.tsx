function TermsOfUsePage() {
    return (
        <div className="min-h-screen py-10 bg-gray-100">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Terms of Use</h1>
                <p className="text-gray-600 mb-4">
                    These Terms of Use (“Terms”) govern your access and use of our online store (“Store”), where digital image bundles and other digital assets are available for purchase. By using the Store, you agree to be bound by these Terms. If you do not agree, please do not use the Store.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">1. Purchases and Access</h2>
                    <p className="text-gray-600">
                        When you purchase digital assets from our Store, you are granted access to download the files at any time. All purchases are associated with your email address, which serves as your primary method for account verification. No other personal information will be stored.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">2. License and Usage Rights</h2>
                    <p className="text-gray-600">
                        Upon purchase, you are granted a non-exclusive, non-transferable license to use the digital assets solely for personal or commercial projects, in accordance with the terms specified in the license agreement. Reselling, redistributing, or sharing the digital assets in any form is strictly prohibited.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">3. Refund Policy</h2>
                    <p className="text-gray-600">
                        Due to the nature of digital goods, all sales are final, and no refunds will be issued. If you encounter issues with your download or have other concerns, please contact our support team.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">4. Intellectual Property Rights</h2>
                    <p className="text-gray-600">
                        All digital assets, including images, text, and other materials, are the property of the Store or its licensors and are protected by copyright, trademark, and other intellectual property laws. Unauthorized use of any assets will be subject to legal action.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">5. Account Security</h2>
                    <p className="text-gray-600">
                        You are responsible for maintaining the confidentiality of your email and any related access credentials. The Store is not liable for any unauthorized access to your purchased items resulting from your failure to protect your account information.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">6. Changes to Terms</h2>
                    <p className="text-gray-600">
                        We reserve the right to update these Terms at any time without prior notice. Any changes will be posted on this page, and it is your responsibility to review the Terms periodically. Continued use of the Store following any changes constitutes acceptance of those changes.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">7. Limitation of Liability</h2>
                    <p className="text-gray-600">
                        The Store and its contents are provided “as is.” We make no guarantees regarding the availability, accuracy, or completeness of any assets. The Store will not be held liable for any direct, indirect, or incidental damages resulting from the use or inability to use our assets.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">8. Governing Law</h2>
                    <p className="text-gray-600">
                        These Terms are governed by and construed in accordance with the laws of Israel. Any disputes arising from the use of the Store will be resolved in accordance with the local jurisdiction laws.
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

export default TermsOfUsePage;
