import PropTypes from 'prop-types'
import Card from '../../molecules/Card/Card.jsx'
import Date from '../../atoms/Date/Date.jsx'
import Icon from '../../atoms/Icon/Icon.jsx'
import Text from '../../atoms/Text/Text.jsx'
import Tag from '../../atoms/Tag/Tag.jsx'
import CollectionTags from "../../molecules/CollectionTags/CollectionTags.jsx";
import { MdOutlinePushPin, MdPushPin } from 'react-icons/md'
import './Note.scss'

export default function Note ({ date, title, content = '', tags = [], pinned = false, status, selected, onSelect, onTogglePin }) {
    const formattedText = content.length > 100 ? content.slice(0, 100) + '…' : content
    // Deleted notes cannot be pinned and unrendered cards never get the pin button.
    const canPin = status !== 'DELETED' && Boolean(onTogglePin)

    return (
        <Card
            as='article'
            aria-label={title}
            aria-current={selected ? 'true' : undefined}
            onClick={onSelect}
            style={{ cursor: 'pointer' }}
        >
            {canPin && (
                /* stopPropagation: pinning must not also select the note card */
                <button
                    type='button'
                    className={pinned ? 'note__pin note__pin--active' : 'note__pin'}
                    aria-label={pinned ? 'Unpin note' : 'Pin note'}
                    aria-pressed={pinned}
                    onClick={event => {
                        event.stopPropagation()
                        onTogglePin()
                    }}
                >
                    <Icon icon={pinned ? MdPushPin : MdOutlinePushPin} />
                </button>
            )}
            <Date date={date} />
            <Text as='h3' size='h2' weight='semibold'>{title}</Text>
            <Text as='p' size='body' weight='regular'>
                {formattedText}
            </Text>
            <CollectionTags maxLength={3}>
                {tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </CollectionTags>
        </Card>
    )
}

Note.propTypes = {
    date: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.array,
    pinned: PropTypes.bool,
    status: PropTypes.string,
    selected: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    onTogglePin: PropTypes.func,
}
