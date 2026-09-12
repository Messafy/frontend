import PropTypes from 'prop-types'
import Card from '../../molecules/Card/Card.jsx'
import Date from '../../atoms/Date/Date.jsx'
import Text from '../../atoms/Text/Text.jsx'
import Tag from '../../atoms/Tag/Tag.jsx'
import CollectionTags from "../../molecules/CollectionTags/CollectionTags.jsx";

export default function Note ({ date, title, content = '', tags = [] }) {
    const formattedText = content.length > 100 ? content.slice(0, 100) + '…' : content

    return (
        <Card as='article' aria-label={title}>
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
}