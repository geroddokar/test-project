import Link from "next/link";

export default function TheHeader() {
    return (
        <header className="row-start-1 flex gap-[24px] flex-wrap items-center justify-center">
            <Link href="/">Головна</Link>
            <Link href="/users">Користувачі</Link>
        </header>
    )
}