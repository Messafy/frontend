import RainDrop from '../../atoms/RainDrop/RainDrop.jsx'
import './Rain.scss'

function createRainDrops (count) {
    return Array.from({ length: count }, (_, index) => {
        const seed = index + 1
        const left = (index * 23 + Math.floor(index / 5) * 11) % 104 - 2
        const top = (index * 31 + Math.floor(index / 7) * 13) % 108 - 12
        const delay = ((index * 37) % 240) / 100

        return {
            delay,
            id: `rain-drop-${index}`,
            left,
            seed,
            top,
        }
    })
}

export default function Rain ({ count = 100 }) {
    const rainDrops = createRainDrops(count)

    return (
        <div aria-hidden='true' className='rain'>
            {rainDrops.map(({ delay, id, left, seed, top }) => (
                <span
                    className='rain__drop-position'
                    key={id}
                    style={{
                        '--rain-drop-left': `${left}%`,
                        '--rain-drop-top': `${top}%`,
                    }}
                >
                    <RainDrop delay={delay} seed={seed} />
                </span>
            ))}
        </div>
    )
}
