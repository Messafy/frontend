import PropTypes from 'prop-types'
import Text from '../Text/Text.jsx'

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

function formatDate (date, type) {
    const dateOnlyMatch = typeof date === 'string' && date.match(/^(\d{4})-(\d{2})-(\d{2})$/)

    if (dateOnlyMatch) {
        const [, year, month, day] = dateOnlyMatch
        const monthIndex = Number(month) - 1
        const dayNumber = Number(day)

        if (!MONTHS[monthIndex] || dayNumber < 1 || dayNumber > 31) {
            return null
        }

        if (type === 'complete') {
            return `${dayNumber} ${MONTHS[monthIndex]} ${year}`
        }

        return `${dayNumber} ${MONTHS[monthIndex]}`
    }

    const parsedDate = new globalThis.Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return null
    }

    const day = parsedDate.getDate()
    const month = MONTHS[parsedDate.getMonth()]

    if (type === 'complete') {
        return `${day} ${month} ${parsedDate.getFullYear()}`
    }

    return `${day} ${month}`
}

export default function Date ({ date, type = 'reduce' }) {
    if (!date) return null

    const safeType = type === 'complete' ? 'complete' : 'reduce'
    const formattedDate = formatDate(date, safeType)

    if (!formattedDate) return null

    return (
        <Text as='time' className='date' dateTime={date} size='small' weight='semibold' color='muted'>
            {formattedDate}
        </Text>
    )
}

Date.propTypes = {
    date: PropTypes.string,
    type: PropTypes.oneOf(['reduce', 'complete']),
}
