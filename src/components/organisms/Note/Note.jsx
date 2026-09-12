import PropTypes from 'prop-types'
import './Note.scss'
import Card from '../../molecules/Card/Card.jsx'
import Date from '../../atoms/Date/Date.jsx'
import Text from '../../atoms/Text/Text.jsx'
import Tag from '../../atoms/Tag/Tag.jsx'
import CollectionTags from "../../molecules/CollectionTags/CollectionTags.jsx";

export default function Note ({ date, title, content = '', tags = [] }) {
    let formattedText = content.slice(0, 100) + '...'
    if (content.length > 100) {
        formattedText = content.slice(0, 100) + '...'
    }
    content = (
        <Text as='p' size='body' weight='regular'>
            {formattedText}
        </Text>
    )

    return (
        <Card>
            <Date date={date} />
            <Text as='h2' size='h2' weight='semibold'>{title}</Text>
            { content }
            <CollectionTags maxLength={3}>
                {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
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