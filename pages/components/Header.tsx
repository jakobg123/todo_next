import Link from 'next/link'

import styles from "../../styles/Header.module.scss"

const Header = () => {
  return (
    <header className={styles.Header}>
        <Link href="/">
        <h1 className={styles.Header__Title}>Min app</h1>
        </Link>
        <nav className={styles.Header__Nav}>
            <ul className={styles.Header__Ul}>
                <li>
                    <Link href="/">
                        Hem
                    </Link>
                </li>
                <li>
                    <Link href="/form">
                        Formulär
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header