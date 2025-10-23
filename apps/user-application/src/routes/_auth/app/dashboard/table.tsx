import DataTable from '@/components/ui/data-table'
import { createFileRoute } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'

export const Route = createFileRoute('/_auth/app/dashboard/table')({
  component: RouteComponent,
})

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

function RouteComponent() {
  const payments: Payment[] = [
  {
    id: "727ed52f",
    amount: 99,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "488e1d42",
    amount: 124,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
]

  return <div>
    <DataTable columns={columns} data={payments} />
  </div>
}

