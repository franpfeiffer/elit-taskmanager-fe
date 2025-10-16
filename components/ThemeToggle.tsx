"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("dark")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
        const initialTheme = savedTheme || "dark"
        setTheme(initialTheme)
        document.documentElement.classList.toggle("dark", initialTheme === "dark")
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark"
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
        document.documentElement.classList.toggle("dark", newTheme === "dark")
    }

    if (!mounted) {
        return (
            <div className="h-10 w-10 rounded-lg border border-border bg-card" />
        )
    }

    return (
        <button
            onClick={toggleTheme}
            className="h-10 w-10 rounded-lg border border-border bg-card hover:bg-accent transition-colors inline-flex items-center justify-center"
            aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground" />
            ) : (
                    <Moon className="h-5 w-5 text-foreground" />
                )}
        </button>
    )
}
