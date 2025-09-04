import Image from "next/image";

export default function Home() {
  return (
    // Централна част със светъл фон и само логото
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {/* Ако логото ти е PNG, смени src="/logo.svg" на src="/logo.png" */}
      <Image
        src="/logo.svg"
        alt="Dr.Kostadinov Logo"
        width={320}
        height={320}
        priority
      />
    </div>
  );
}
