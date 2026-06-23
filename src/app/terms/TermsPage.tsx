"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getFirebaseApp } from "@/lib/firebase";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Terms } from "@/types";

const DEFAULT_TERMS = `1. Services
I provide software development services including web development, desktop applications, and API development. Each project engagement is governed by a separate Statement of Work (SOW) or service agreement that defines the specific scope, deliverables, timeline, and fees.

2. Intellectual Property Rights
Upon full payment of all fees due for a project, all intellectual property rights, including copyright and ownership of the delivered source code, design assets, and documentation, are transferred to the client. I retain the right to display the work in my portfolio unless otherwise agreed in writing.

3. Confidentiality
All project-related information, source code, business data, and communications shared through this platform or during the engagement are treated as strictly confidential. I will not disclose such information to any third party without explicit written consent, except as required by law.

4. Client Responsibilities
The client agrees to provide timely feedback, access to necessary systems, and clear requirements. Delays caused by the client may affect project timelines and are not the responsibility of the developer.

5. Limitation of Liability
The total liability of the developer, whether in contract, warranty, tort, or otherwise, shall not exceed the total fees paid by the client for the specific project giving rise to the claim. In no event shall the developer be liable for any indirect, incidental, special, or consequential damages, including but not limited to loss of profits, data, or business interruption.

6. Warranty
Delivered work is warranted to conform to the agreed specifications for a period of 30 days from delivery. This warranty covers bugs and defects in the delivered code. It does not cover modifications made by the client or third parties, or issues arising from third-party services, hosting, or infrastructure.

7. Termination
Either party may terminate a project engagement with 14 days written notice. The client shall pay for all work completed up to the termination date. Upon termination, any intellectual property for work completed and paid for shall be transferred to the client.

8. Revisions and Scope Changes
Minor revisions within the agreed scope are included. Significant scope changes may result in adjusted fees and timelines, which will be communicated and agreed upon before implementation.

9. Governing Law
These terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved through arbitration or competent courts.

10. Contact
For questions regarding these terms, contact: fghfghffdgfhfgh@gmail.com`;

export function TermsPage() {
  const [terms, setTerms] = useState<Terms | null>(null);

  useEffect(() => {
    const { db } = getFirebaseApp();
    if (!db) return;
    getDoc(doc(db, "terms", "latest")).then((snap) => {
      if (snap.exists()) setTerms({ id: snap.id, ...snap.data() } as Terms);
    });
  }, []);

  const content = terms?.content || DEFAULT_TERMS;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 md:py-28">
      <FadeIn>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
          Legal
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-2">
          Terms of Service
        </h1>
        {terms && (
          <p className="text-sm text-gray-400 mb-8">
            Version {terms.version} &middot; Last updated{" "}
            {new Date(terms.updatedAt).toLocaleDateString()}
          </p>
        )}
        {!terms && (
          <p className="text-sm text-gray-400 mb-8">Default terms</p>
        )}
      </FadeIn>

      <FadeIn delay={100}>
        <div className="space-y-8">
          {content.split(/\n(?=\d+\.\s)/).map((section, i) => {
            const [title, ...body] = section.split("\n");
            const num = title.match(/^(\d+)\.\s(.+)/);
            return (
              <div key={i}>
                <h2 className="font-semibold text-lg mb-2">
                  {num ? `${num[1]}. ${num[2]}` : title}
                </h2>
                <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
                  {body.map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </div>
  );
}
