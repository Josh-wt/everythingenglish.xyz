import React from 'react';
const Terms = () => {
  return <div className="min-h-screen bg-rose-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{
            fontFamily: 'Fredoka One, cursive'
          }}>Terms Of Service </h1>
            <p className="text-gray-600 mx-[5px]">Last updated: August 2025</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using EverythingEnglish ("Service"), you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Service Description</h2>
                <p className="text-gray-600 mb-4">
                  EverythingEnglish provides AI-powered English essay feedback and grading services. Our platform offers 
                  instant feedback, grading, and educational insights to help users improve their English writing skills.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Payment Terms</h2>
                <div className="text-gray-600 mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Free Plan:</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>3 one-time credits, no recurring charges</li>
                    <li>Basic AI feedback and grading features</li>
                  </ul>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">Unlimited Plan:</h3>
                  <ul className="list-disc pl-6 mb-4">
                    <li>$4.99/month with automatic renewal</li>
                    <li>Unlimited essay evaluations and premium features</li>
                    <li>Cancel anytime through your account settings</li>
                    <li>Refunds are subject to our refund policy</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Acceptable Use</h2>
                <p className="text-gray-600 mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Use the service for any illegal or unauthorized purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Share your account credentials with others</li>
                  <li>Use the service for commercial purposes without permission</li>
                  <li>Submit content that violates intellectual property rights</li>
                  <li>Engage in automated abuse or excessive usage that impacts service quality</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. AI Disclaimer</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-700">
                    <strong>Important:</strong> Our AI-powered feedback may contain errors or inaccuracies. 
                    We strongly recommend human review for important assignments, exams, or official submissions. 
                    Users should not rely solely on AI feedback for critical academic or professional work.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Data Usage and Training</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-700">
                    <strong>Privacy Protection:</strong> Your essays and content are NOT used for AI training purposes. 
                    We maintain strict privacy standards and protect your intellectual property and personal data.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  EverythingEnglish shall not be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                  resulting from your use of the service. Our total liability is limited to the amount you paid in the 
                  previous 12 months.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Termination</h2>
                <p className="text-gray-600 mb-4">
                  We may terminate or suspend your account immediately, without prior notice, for conduct that we believe 
                  violates these Terms of Service. Upon termination, your right to use the service will cease immediately. 
                  Paid subscriptions remain accessible until the end of the current billing period.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Governing Law</h2>
                <p className="text-gray-600 mb-4">
                  These Terms shall be interpreted and governed by the laws of India. Any disputes arising from these 
                  terms or your use of the service shall be subject to the jurisdiction of Indian courts.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Contact Information</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <img src="https://ik.imagekit.io/lqf8a8nmt/1721195102868.jpeg?updatedAt=1753412135966" alt="Jerry Kurian" className="w-16 h-16 rounded-full object-cover" />
                    <div className="text-center md:text-left">
                      <h4 className="font-bold text-gray-800">Jerry Kurian</h4>
                      <p className="text-gray-600">everythingenglishedu@gmail.com</p>
                      <p className="text-gray-600 text-sm">
                        Librety Acers, Attibele, Sarjapur, Karnataka, India
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="border-t pt-6 mt-8">
                <p className="text-sm text-gray-500 text-center">
                  By using EverythingEnglish, you acknowledge that you have read and understood these Terms of Service 
                  and agree to be bound by them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Terms;