import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {/* смени на /logo.png ако ползваш PNG */}
      <Image src="/logo.svg" alt="Dr.Kostadinov Logo" width={320} height={320} priority />
    </div>
  );
}
