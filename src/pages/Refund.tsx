
import React from 'react';

const Refund = () => {
  return (
    <div className="min-h-screen bg-rose-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Fredoka One, cursive' }}>
              Refund Policy
            </h1>
            <p className="text-gray-600">Last updated: January 2025</p>
          </div>

          {/* Summary Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-gray-800 mb-4">Quick Summary</h3>
            <ul className="text-gray-600 space-y-2">
              <li><strong>7-day window:</strong> Full refunds within 7 days of subscription</li>
              <li><strong>Valid reason required:</strong> Must explain dissatisfaction</li>
              <li><strong>Full refund only:</strong> Get back exactly what you paid</li>
              <li><strong>No exceptions:</strong> No refunds after 7-day period</li>
              <li><strong>Fast processing:</strong> 24-hour response, 3-5 days refund</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. General Refund Policy</h2>
                <p className="text-gray-600 mb-4">
                  EnglishGPT offers a straightforward 7-day refund policy. If you're not satisfied with our service 
                  for any valid reason, you can request a full refund within 7 days of your subscription start date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Refund Eligibility</h2>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Clear, simple rules:</h4>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li><strong>7-Day Window:</strong> Full refunds available for any subscription within 7 days of purchase</li>
                      <li><strong>Valid Reason Required:</strong> Must provide a legitimate reason for dissatisfaction</li>
                      <li><strong>Full Refund Only:</strong> No partial or pro-rated refunds - you get back exactly what you paid</li>
                      <li><strong>After 7 Days:</strong> No refunds available under any circumstances</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. What Qualifies for Refunds</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-green-700 mb-3">✓ Acceptable reasons include:</h4>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>AI feedback quality doesn't meet expectations</li>
                      <li>Technical problems preventing service use</li>
                      <li>Service doesn't match advertised features</li>
                      <li>Billing errors or unauthorized charges</li>
                      <li>General dissatisfaction with service quality</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 mb-3">✗ What doesn't qualify:</h4>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>Simply changing your mind without trying the service</li>
                      <li>Requests after the 7-day period</li>
                      <li>Wanting to switch to a different service</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Free Plan Policy</h2>
                <p className="text-gray-600 mb-4">
                  The Free Plan involves no payment, so no refunds are applicable. Users receive 3 complimentary 
                  credits to evaluate our service quality.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Unlimited Plan Policy</h2>
                <p className="text-gray-600 mb-4">
                  For the $4.99 Unlimited Plan: request a full $4.99 refund within 7 days of subscription start 
                  if dissatisfied for any valid reason. After 7 days, no refunds are available.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Simple Refund Process</h2>
                <p className="text-gray-600 mb-4">Easy 3-step process:</p>
                <ol className="list-decimal pl-6 text-gray-600 mb-4 space-y-2">
                  <li>Email <strong>everythingenglishedu@gmail.com</strong> within 7 days</li>
                  <li>Subject line: <strong>"Refund Request - [Your Email]"</strong></li>
                  <li>Include: Subscription date, reason for refund request, account email</li>
                </ol>
                <p className="text-gray-600 mb-4">
                  <strong>Response:</strong> 24-hour review and response, 3-5 business days processing for approved requests.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. No Exceptions Policy</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-gray-800 font-medium">
                    We do not make exceptions to the 7-day refund window. Please ensure you evaluate our service 
                    thoroughly within this timeframe if you have any concerns.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Contact Information</h2>
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
                        For refund requests, please email with "Refund Request - [Your Email]" in the subject line.
                      </p>
                      <p className="text-gray-600 text-sm">
                        Librety Acers, Attibele, Sarjapur, Karnataka, India
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="border-t pt-6 mt-8">
                <p className="text-sm text-gray-500 text-center">
                  This simplified refund policy is designed to be clear and fair. 
                  We appreciate your understanding and support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refund;
