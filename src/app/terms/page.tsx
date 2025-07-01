import Header from "../components/Header";

export default function Terms() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>

          <div className="space-y-6 text-gray-600">
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using SnapSuite, you accept and agree to be bound
              by the terms and provisions of this agreement.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              2. Use License
            </h2>
            <p>
              SnapSuite grants you a personal, non-exclusive, non-transferable
              license to use our service for creating tweet images. You may
              download and use images created through our service for personal
              or commercial use.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              3. User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                You are responsible for any content you create using our service
              </li>
              <li>
                You must not violate any third-party rights when using our
                service
              </li>
              <li>
                You must not use our service for any illegal or unauthorized
                purpose
              </li>
              <li>
                You must not interfere with or disrupt our service or servers
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              4. Intellectual Property
            </h2>
            <p>
              The service and its original content, features, and functionality
              are owned by SnapSuite and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property laws.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              5. Disclaimer
            </h2>
            <p>
              SnapSuite is provided "as is" without any warranties, expressed or
              implied. We do not warrant that the service will be uninterrupted
              or error-free.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              6. Limitation of Liability
            </h2>
            <p>
              In no event shall SnapSuite be liable for any indirect,
              incidental, special, consequential or punitive damages, including
              without limitation, loss of profits, data, use, goodwill, or other
              intangible losses.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              7. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify or replace these terms at any time.
              We will provide notice of any changes by posting the new terms on
              this page.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us
              through our contact page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
