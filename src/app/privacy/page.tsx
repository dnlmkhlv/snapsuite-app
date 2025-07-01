import Header from "../components/Header";

export default function Privacy() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-gray-600">
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              1. Information We Collect
            </h2>
            <p>
              SnapSuite is designed with privacy in mind. We do not store any of
              your tweets or images permanently. All processing is done
              client-side in your browser, and any images you create are only
              stored locally on your device when you choose to download them.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p>
              We use any information collected solely for the purpose of
              providing and improving our service. We do not share any personal
              information with third parties.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              3. Cookies and Tracking
            </h2>
            <p>
              We use essential cookies only for the proper functioning of our
              website. We do not use any tracking cookies or third-party
              analytics services.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              4. Data Security
            </h2>
            <p>
              Your data security is important to us. Since we process everything
              client-side and don't store any personal data, there's minimal
              risk to your privacy. Any images you create are only saved when
              you explicitly choose to download them.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              5. Changes to This Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              6. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us through our contact page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
