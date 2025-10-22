import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center" style={{ height: '80vh', flexDirection: 'column' }}>
        <h1 className="text-center font-bold mt-9 text-6xl">404 - Pagina não encontrada!</h1>
        <p>Essa pagina provavelmente nao existe amigão.</p>


        <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        Voltar para a pagina inicial
        </Link>
    </div>
  );
}