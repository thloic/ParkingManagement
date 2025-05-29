import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
  <div>
    {/* <UserButton /> */}
   <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-6">
          Gérer un parking n'a jamais été aussi simple 🚘
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Suivez les véhicules, gérez les tickets et contrôlez les transactions en toute simplicité.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/sign-in"
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md"
          >
            Se connecter
          </Link>
          <Link
            href="/sign-up"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition shadow-md"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </main>
  </div>
  );
}
