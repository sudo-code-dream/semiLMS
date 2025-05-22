// app/hero/layout.tsx
export default function HeroLayout({ children }: { children: React.ReactNode }) {
    return (
        // Render children without the navbar
        <main>
            {children}
        </main>
    )
}
