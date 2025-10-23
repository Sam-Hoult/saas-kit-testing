import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/app/dashboard')({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      breadcrumb: {
        title: 'Dashboard',
      },
    };
  },
})

function RouteComponent() {
  return <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
    <Outlet/>
    </div>
}
