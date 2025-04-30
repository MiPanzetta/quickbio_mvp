import { useState } from "react";

export default function BioCard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p>{text}</p>
      <button onClick={copyToClipboard} className="text-blue-500 mt-2">
        {copied ? "Kopiert!" : "Kopieren"}
      </button>
    </div>
  );
}