import PropTypes from 'prop-types'
import ContentCard from '../../molecules/ContentCard/ContentCard.jsx'
import FormattedDate from '../../atoms/FormattedDate/FormattedDate.jsx'
import UiIcon from '../../atoms/UiIcon/UiIcon.jsx'
import StyledText from '../../atoms/StyledText/StyledText.jsx'
import RemovableTag from '../../atoms/RemovableTag/RemovableTag.jsx'
import TagList from "../../molecules/TagList/TagList.jsx";
import NoteAccessTypeIndicator from '../../atoms/NoteAccessTypeIndicator/NoteAccessTypeIndicator.jsx'
import { MdOutlinePushPin, MdPushPin } from 'react-icons/md'
import './NoteCard.scss'

export default function NoteCard ({ date, title, content = '', tags = [], pinned = false, status, type, ownerId, sharedWith, accountId, selected, onSelect, onTogglePin }) {
    const formattedText = content.length > 100 ? content.slice(0, 100) + '…' : content
    const relationship = type === 'PRIVATE'
        ? 'private'
        : ownerId === accountId ? 'sent' : sharedWith === accountId ? 'inbox' : 'shared'
    // Deleted notes cannot be pinned and unrendered cards never get the pin button.
    const canPin = status !== 'DELETED' && Boolean(onTogglePin)

    return (
        <ContentCard
            as='article'
            className='card note'
            aria-label={title}
            aria-current={selected ? 'true' : undefined}
            onClick={onSelect}
            style={{ cursor: 'pointer' }}
        >
            <NoteAccessTypeIndicator type={relationship} />
            {canPin && (
                /* stopPropagation: pinning must not also select the note card */
                <button
                    type='button'
                    className={pinned ? 'note__pin note__pin--active' : 'note__pin'}
                    aria-label={pinned ? 'Unpin note' : 'Pin note'}
                    title={pinned ? 'Unpin note' : 'Pin note'}
                    aria-pressed={pinned}
                    onClick={event => {
                        event.stopPropagation()
                        onTogglePin()
                    }}
                >
                    <UiIcon icon={pinned ? MdPushPin : MdOutlinePushPin} />
                </button>
            )}
            <FormattedDate date={date} />
            <StyledText as='h3' size='h2' weight='semibold'>{title}</StyledText>
            <StyledText as='p' size='body' weight='regular'>
                {formattedText}
            </StyledText>
            <TagList maxLength={3}>
                {tags.map((tag) => (
                    <RemovableTag key={tag}>{tag}</RemovableTag>
                ))}
            </TagList>
        </ContentCard>
    )
}

NoteCard.propTypes = {
    date: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.array,
    pinned: PropTypes.bool,
    type: PropTypes.string,
    ownerId: PropTypes.string,
    sharedWith: PropTypes.string,
    accountId: PropTypes.string,
    status: PropTypes.string,
    selected: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    onTogglePin: PropTypes.func,
}
