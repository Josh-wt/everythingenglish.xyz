
import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-rose-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Fredoka One, cursive' }}>
              Privacy Policy
            </h1>
            <p className="text-gray-600">Last updated: August 2025</p>
          </div>

          {/* Training Data Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-800 mb-2">AI Training Data Policy</h3>
            <p className="text-blue-700">
              By default, EverythingEnglish uses submitted essays and AI feedback to improve our AI models. 
              You can disable this feature in your account settings at any time. When disabled, your content 
              is only used to provide feedback services.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Information We Collect</h2>
                <div className="text-gray-600 mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Personal Information:</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Email address and account credentials</li>
                    <li>Payment and billing information</li>
                    <li>Account preferences and settings</li>
                    <li>Discord login details (if using Discord authentication)</li>
                  </ul>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">Content Information:</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Essays and writing submissions</li>
                    <li>AI feedback and grading data</li>
                    <li>Usage analytics and interaction data</li>
                  </ul>

                  <h3 className="font-semibold text-gray-800 mb-2">Technical Information:</h3>
                  <ul className="list-disc pl-6">
                    <li>IP addresses and browser information</li>
                    <li>Device and operating system data</li>
                    <li>Performance and error logs</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Use Your Data</h2>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Service delivery and AI-powered feedback generation</li>
                  <li>Account management and customer support</li>
                  <li>Analytics and service improvement</li>
                  <li>Communication about your account and service updates</li>
                  <li>Technical operations and security monitoring</li>
                  <li><strong>AI model improvement and training (when enabled)</strong></li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Analytics</h2>
                <p className="text-gray-600 mb-4">
                  We use Google Analytics to understand website usage patterns and improve user experience. 
                  This helps us optimize our platform and identify areas for enhancement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Training Data Usage</h2>
                <p className="text-gray-600 mb-4">
                  <strong>Default Setting:</strong> By default, your essays and AI feedback are used to improve our AI models. 
                  This data is processed in anonymized form to protect your privacy while helping us enhance our service quality.
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Opt-Out Process:</strong> You can disable training data usage at any time by:
                </p>
                <ol className="list-decimal pl-6 text-gray-600 mb-4">
                  <li>Logging into your account</li>
                  <li>Going to account settings</li>
                  <li>Toggling off "Use my data for AI training"</li>
                  <li>Saving your preferences</li>
                </ol>
                <p className="text-gray-600 mb-4">
                  When training data usage is disabled, your content is only used to provide direct feedback services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Data Sharing</h2>
                <p className="text-gray-600 mb-4">We do not sell your personal data. We may share information with:</p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Service providers who assist in platform operations</li>
                  <li>Payment processors for billing purposes</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Security Measures</h2>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Secure servers with limited personnel access</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Training data anonymization processes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Your Rights</h2>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li><strong>Training Data Opt-Out:</strong> Disable AI training data usage in account settings</li>
                  <li><strong>Data Access:</strong> Request copies of your personal data</li>
                  <li><strong>Data Correction:</strong> Update inaccurate information</li>
                  <li><strong>Data Deletion:</strong> Request removal of your account and data</li>
                  <li><strong>Data Portability:</strong> Export your data in standard formats</li>
                  <li><strong>Marketing Opt-Out:</strong> Unsubscribe from promotional communications</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Data Retention</h2>
                <p className="text-gray-600 mb-4">
                  We retain your data for as long as your account is active or as needed to provide services. 
                  After account deletion, data is removed within 30 days, except where retention is required by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Cookies</h2>
                <p className="text-gray-600 mb-4">
                  We use essential cookies for platform functionality and analytics cookies to understand usage patterns. 
                  You can manage cookie preferences through your browser settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Policy Updates</h2>
                <p className="text-gray-600 mb-4">
                  We may update this policy periodically. Material changes will be communicated via email and 
                  prominently displayed on our platform. Continued use after changes constitutes acceptance.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Contact Information</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <img
                      src="https://ik.imagekit.io/lqf8a8nmt/1721195102868.jpeg?updatedAt=1753412135966"
                      alt="Jerry Kurian"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="text-center md:text-left">
                      <h4 className="font-bold text-gray-800">Jerry Kurian</h4>
                      <p className="text-gray-600">everythingenglishedu@gmail.com</p>
                      <p className="text-gray-600 text-sm">
                        For privacy inquiries, please email with "Privacy Question" in the subject line.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="border-t pt-6 mt-8">
                <p className="text-sm text-gray-500 text-center">
                  By using EverythingEnglish, you acknowledge that you have read and understood this Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
