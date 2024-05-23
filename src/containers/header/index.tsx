import GNB from '@/types/gnb'
import Head from 'next/head'
import Link from 'next/link'

function Header() {
  return (
    <Head>
      <nav>
        {GNB.map((item) => {
          return (
            <Link href={item.link} key={item.name}>
              {item.name}
            </Link>
          )
        })}
      </nav>
    </Head>
  )
}

export default Header
