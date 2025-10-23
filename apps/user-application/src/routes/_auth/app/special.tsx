import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/app/special')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <h1>Heading 1</h1>
  </div>
}
