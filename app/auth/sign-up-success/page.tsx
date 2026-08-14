import Link from 'next/link'

export default function SignUpSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-8 text-foreground">
      <section className="glass-panel w-full max-w-lg p-8 text-center sm:p-12">
        <p className="eyebrow">One last step</p>
        <h1 className="mt-3 font-serif text-4xl text-emerald-50">Confirm your email</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          We sent a confirmation link to your inbox. Open it, then sign in to land on your Siraj home page.
        </p>
        <Link href="/auth/login" className="primary-button mt-8 inline-flex">Return to sign in</Link>
      </section>
    </main>
  )
}
