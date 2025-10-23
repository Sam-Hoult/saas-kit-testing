import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/app/dashboard/')({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      breadcrumb: {
        title: 'Home',
      },
    };
  },
})

function RouteComponent() {
  return <div className='p-4'>
    <h1>Hey and welcome to the dashboard home</h1>
  </div>
}
