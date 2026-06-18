import { Dice5, House, Rocket, SquareChartGantt, User } from 'lucide-react'
import { SidebarRoute } from '../model/sidebar-route.model'
import { SidebarItem } from './sidebar-item'

export const SidebarNavigation = () => {
  const routes: SidebarRoute[] = [
    {
      label: 'Главная',
      href: '/dashboard',
      icon: House
    },
    {
      label: 'События',
      href: '/events',
      icon: SquareChartGantt
    },
    {
      label: 'Мои ставки',
      href: '/bets',
      icon: Dice5
    },
    {
      label: 'Краш',
      href: '/crash',
      icon: Rocket
    },
    {
      label: 'Профиль',
      href: '/profile',
      icon: User
    }
  ]

  return (
    <div className='flex w-full flex-col items-center gap-3'>
      {routes.map((route, index) => (
        <SidebarItem route={route} key={index} />
      ))}
    </div>
  )
}
