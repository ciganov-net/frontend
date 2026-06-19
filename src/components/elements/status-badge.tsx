import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle2, XCircle, Ban, FileQuestion } from 'lucide-react'

const statusConfig = {
  WON: {
    label: 'ВЫИГРЫШ',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: CheckCircle2
  },
  LOST: {
    label: 'ПРОИГРЫШ',
    color: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    icon: XCircle
  },
  PENDING: {
    label: 'В ИГРЕ',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    icon: Clock
  },
  CANCELLED: {
    label: 'ОТМЕНЕНО',
    color: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30',
    icon: Ban
  }
}

export const StatusBadge = ({ status }: { status: string }) => {
  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    color: 'bg-gray-500/10 text-gray-400',
    icon: FileQuestion
  }
  const Icon = config.icon

  return (
    <Badge
      variant='outline'
      className={`gap-1.5 px-2.5 py-0.5 ${config.color}`}
    >
      <Icon className='h-3.5 w-3.5' />
      {config.label}
    </Badge>
  )
}
