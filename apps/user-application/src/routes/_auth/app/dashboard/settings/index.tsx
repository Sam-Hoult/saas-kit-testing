import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/app/dashboard/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/app/dashboard/settings/"!</div>
}
