import Header from "../components/Header";

export default function About() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            About SnapSuite
          </h1>

          <div className="space-y-6 text-gray-600">
            <p>
              SnapSuite is a powerful tool designed to help you create
              beautiful, Instagram-ready images from your tweets. Whether you're
              a content creator, marketer, or social media enthusiast, SnapSuite
              makes it easy to transform your tweets into engaging visual
              content.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Our Features
            </h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Customizable tweet layouts with multiple themes</li>
              <li>Professional font selection and styling options</li>
              <li>Custom gradient backgrounds</li>
              <li>Profile photo integration</li>
              <li>Verified badge support</li>
              <li>High-resolution image export</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Our Mission
            </h2>
            <p>
              Our mission is to empower creators with tools that make content
              creation seamless and professional. We believe in making social
              media content creation accessible to everyone, regardless of their
              design experience.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Get Started
            </h2>
            <p>
              Ready to transform your tweets into stunning visuals? Head back to
              our homepage and start creating your first tweet image. No account
              required - it's free and easy to use!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
