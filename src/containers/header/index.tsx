import GNB from '@/types/gnb'

import Link from 'next/link'

const Header = () => {
  return (
    <nav>
      {GNB.map((item) => {
        return (
          <Link href={item.link} key={item.name}>
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}

export default Header
