import { useState } from "react";
import BioCard from "../components/BioCard";

export default function Home() {
  const [input, setInput] = useState("");
  const [bios, setBios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setBios(data.bios);
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">QuickBio</h1>
      <textarea
        placeholder="Beschreibe dich oder dein Projekt..."
        className="w-full p-4 rounded-lg border mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
      />
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Generiere..." : "Bio generieren"}
      </button>

      <div className="mt-6 grid gap-4">
        {bios.map((bio, i) => (
          <BioCard key={i} text={bio} />
        ))}
      </div>
    </main>
  );
}