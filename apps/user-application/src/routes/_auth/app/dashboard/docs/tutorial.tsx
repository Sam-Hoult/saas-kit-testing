import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/app/dashboard/docs/tutorial')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/app/dashboard/docs/tutorial"!</div>
}
