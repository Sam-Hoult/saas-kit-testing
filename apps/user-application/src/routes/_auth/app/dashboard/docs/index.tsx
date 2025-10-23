import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/app/dashboard/docs/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/app/dashboard/docs/"!</div>
}
