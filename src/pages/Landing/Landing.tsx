// stylesheets
import styles from './Landing.module.css'

// types
import { User } from '../../types/models'

interface LandingProps {
    user: User | null
}

const Landing = (props: LandingProps): JSX.Element => {
    const { user } = props

    return (
        <main className={styles.container}>
            <span className={styles.logo}>Flitter</span>
            <p className={styles.desc}>Flit your thoughts and join the conversatin with Flitter.</p>
        </main>
    )
}

export default Landing
