import { useState } from 'react';
import PropTypes from 'prop-types';
import { LuX } from 'react-icons/lu';
import Button from '../../atoms/Button/Button.jsx';
import Icon from '../../atoms/Icon/Icon.jsx';
import Input from '../../atoms/Input/Input.jsx';
import Tag from '../../atoms/Tag/Tag.jsx';
import Text from '../../atoms/Text/Text.jsx';
import './TagEditor.scss';

// Mirrors the backend Tag validation: letters, numbers, spaces, hyphens and underscores only.
const VALID_TAG_PATTERN = /^[\p{L}\p{M}\p{N} _-]+$/u;

export default function TagEditor({ tags, onAdd, onClose, onRemove, placement = 'above' }) {
    const [value, setValue] = useState('');
    const normalizedValue = value.trim();
    const isDuplicate = tags.some(
        tag => tag.toLocaleLowerCase() === normalizedValue.toLocaleLowerCase()
    );
    const canAdd = Boolean(normalizedValue)
        && VALID_TAG_PATTERN.test(normalizedValue)
        && !isDuplicate;

    function handleSubmit(event) {
        event.preventDefault();

        if (!canAdd) {
            return;
        }

        onAdd(normalizedValue);
        setValue('');
    }

    function handleKeyDown(event) {
        if (event.key === 'Escape') {
            onClose();
        }
    }

    return (
        <>
            {/* Full-screen click-catcher: any click outside the popup closes it. */}
            <div className='tag-editor__backdrop' onClick={onClose} aria-hidden='true' />
            <aside
                className={`tag-editor tag-editor--${placement}`}
                role='dialog'
                aria-label='Manage note tags'
                onKeyDown={handleKeyDown}
            >
                <div className='tag-editor__header'>
                    <Text as='span' size='small' weight='semibold'>Add tag</Text>
                    <Button
                        className='tag-editor__close'
                        variant='ghost'
                        aria-label='Close tag editor'
                        onClick={onClose}
                    >
                        <Icon icon={LuX} aria-hidden='true' />
                    </Button>
                </div>

                <form className='tag-editor__form' onSubmit={handleSubmit}>
                    <Input
                        variant='tag'
                        value={value}
                        placeholder='Tag name...'
                        aria-label='Tag name'
                        autoFocus
                        onChange={event => setValue(event.target.value)}
                    />
                    <Button type='submit' disabled={!canAdd}>Add</Button>
                </form>

                {tags.length > 0 && (
                    <div className='tag-editor__tags' aria-label='Current tags'>
                        {tags.map(tag => (
                            <Tag
                                key={tag}
                                onRemove={() => onRemove(tag)}
                                removeLabel={`Remove ${tag} tag`}
                            >
                                {tag}
                            </Tag>
                        ))}
                    </div>
                )}
            </aside>
        </>
    );
}

TagEditor.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    placement: PropTypes.oneOf(['above', 'below']),
};
