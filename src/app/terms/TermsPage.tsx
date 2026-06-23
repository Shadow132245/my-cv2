"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getFirebaseApp } from "@/lib/firebase";
import type { Terms } from "@/types";

export function TermsPage() {
  const [terms, setTerms] = useState<Terms | null>(null);

  useEffect(() => {
    const { db } = getFirebaseApp();
    if (!db) return;
    getDoc(doc(db, "terms", "latest")).then((snap) => {
      if (snap.exists()) setTerms({ id: snap.id, ...snap.data() } as Terms);
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
      {terms ? (
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {terms.content.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      ) : (
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>1. Services</h2>
          <p>
            I provide software development services including web development,
            desktop applications, and API development. Each project is governed
            by a separate agreement.
          </p>
          <h2>2. Intellectual Property</h2>
          <p>
            Upon full payment, all intellectual property rights for the delivered
            work are transferred to the client, unless otherwise agreed.
          </p>
          <h2>3. Confidentiality</h2>
          <p>
            All project-related information shared through this platform is
            treated as confidential and will not be disclosed to third parties.
          </p>
          <h2>4. Limitation of Liability</h2>
          <p>
            I am not liable for any indirect damages arising from the use of the
            delivered software. Total liability is limited to the amount paid for
            the specific project.
          </p>
          <h2>5. Contact</h2>
          <p>
            For any questions regarding these terms, please contact me through
            the platform.
          </p>
        </div>
      )}
    </div>
  );
}
