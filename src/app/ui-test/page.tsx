import { Button } from '@/components/ui/button'

export default function UiTestPage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-3xl font-bold">Button test</h1>

      <div className="flex flex-col gap-10">
        <section>
          <h2 className="mb-4 text-xl font-semibold">Large</h2>

          <div className="flex flex-wrap gap-4">
            <Button size="large" variant="solid" color="primary">
              Сделать ставку
            </Button>

            <Button size="large" variant="solid" color="secondary">
              Сделать ставку
            </Button>

             <Button size="large" variant="outline" color="primary">
              Сделать ставку
            </Button>
            <Button size="large" variant="outline" color="secondary">
              Сделать ставку
            </Button>
            </div>
        </section>
        <section>
          <h2 className="mb-4 text-xl font-semibold">Medium</h2>
          <div className="flex flex-wrap gap-4">
            <Button size="medium" variant="solid" color="primary">
              Сделать ставку
            </Button>

            <Button size="medium" variant="solid" color="secondary">
              Сделать ставку
            </Button>
            <Button size="medium" variant="outline" color="primary">
              Сделать ставку
            </Button>
            <Button size="medium" variant="outline" color="secondary">
              Сделать ставку
            </Button>
            </div>
        </section>
      </div>
    </main>
  )
}