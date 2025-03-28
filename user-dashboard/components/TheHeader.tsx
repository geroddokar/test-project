import Link from "next/link";

export default function TheHeader() {
    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Тестове завдання</h1>
                <nav className="hidden md:flex space-x-4">
                    <Link href="/" className="hover:underline">ГОЛОВНА</Link>
                    <Link href="/users" className="hover:underline">КОРИСТУВАЧІ</Link>
                </nav>
                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 border rounded">☰</button>
            </div>
        </header>
    )
}