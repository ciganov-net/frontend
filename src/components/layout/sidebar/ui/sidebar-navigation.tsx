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
      href: '/minigames/crush',
      icon: Rocket
    },
    {
      label: 'Профиль',
      href: '/profile',
      icon: User
    }
  ]

  return (
    <div className={'space-y-2 px-2 lg:pt-0'}>
      {routes.map((route, index) => (
        <SidebarItem route={route} key={index} />
      ))}
    </div>
  )
}
