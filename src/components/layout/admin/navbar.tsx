'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import {
  AlarmClockCheckIcon,
  AtomIcon,
  BinocularsIcon,
  Building2Icon,
  CalendarRangeIcon,
  ChartBarStacked,
  CircleDollarSign,
  CoinsIcon,
  ContactIcon,
  EarthIcon,
  FolderIcon,
  LandPlotIcon,
  LucideIcon,
  NotepadTextIcon,
  UniversityIcon,
  User
} from 'lucide-react'
import Link from 'next/link'

interface Props {
  className?: string
}

interface IconComponent {
  title: string
  href: string
  icon: LucideIcon
}

const betComponents: IconComponent[] = [
  {
    title: 'Категории',
    icon: ChartBarStacked,
    href: 'categories'
  },
  {
    title: 'Ивенты',
    icon: CircleDollarSign,
    href: 'events'
  }
]

const userComponents: IconComponent[] = [
  {
    title: 'Пользователи',
    icon: User,
    href: 'users'
  }
]

export const AdminNavigationHeader: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Ставки</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[250px] gap-2'>
                {betComponents.map(c => (
                  <ListWithIconItem
                    key={c.title}
                    title={c.title}
                    href={c.href}
                    icon={c.icon}
                  />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Пользователи</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[250px] gap-2'>
                {userComponents.map(c => (
                  <ListWithIconItem
                    key={c.title}
                    title={c.title}
                    href={c.href}
                    icon={c.icon}
                  />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

function ListWithIconItem({ icon: Icon, title, href }: IconComponent) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={`/admin/${href}`}
          className='flex flex-row items-center gap-2'
        >
          <Icon />
          {title}
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
