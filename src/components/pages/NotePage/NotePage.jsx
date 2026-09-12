import './NotePage.scss';
import Button from "../../atoms/Button/Button.jsx";
import Icon from "../../atoms/Icon/Icon.jsx";
import Input from "../../atoms/Input/Input.jsx";
import Label from "../../atoms/Label/Label.jsx";
import Profile from "../../atoms/Profile/Profile.jsx";
import Tag from "../../atoms/Tag/Tag.jsx";
import Text from '../../atoms/Text/Text.jsx'
import CollectionLabels from "../../molecules/CollectionLabels/CollectionLabels.jsx";
import CollectionTags from "../../molecules/CollectionTags/CollectionTags.jsx";
import Note from "../../organisms/Note/Note.jsx";
import TextArea from "../../atoms/TextArea/TextArea.jsx";
import {
    IoAdd,
    IoBriefcaseOutline,
    IoDocumentTextOutline,
    IoPinOutline,
    IoSearch,
    IoTrashOutline,
} from "react-icons/io5";
import {LuChevronDown, LuLightbulb, LuPaperclip, LuTag, LuUserRound} from "react-icons/lu";
import {notes} from "../../../mocks/notes.js";

export default function NotePage() {
    return (
        <main className='note-page'>
            <MenuAside />
            <CollectionNotes />
            <NoteWrite />
        </main>
    )
}
function MenuAside () {
    return (
        <aside className='menu-aside'>
            <div className='menu-aside__content'>
                <Input placeholder='Search notes...'>
                    <Icon icon={IoSearch} />
                </Input>

                <CollectionLabels maxLength={3}>
                    <Label className='label--active' icon={IoDocumentTextOutline} text='All Notes' />
                    <Label icon={IoPinOutline} text='Pinned Notes' />
                    <Label icon={IoTrashOutline} text='Trash' />
                </CollectionLabels>

                <section className='menu-aside__section'>
                    <div className='menu-aside__section-header'>
                        <Text as='span' size='small' color='secondary'>Folders</Text>
                        <Icon className='animated' icon={IoAdd} />
                    </div>
                    <CollectionLabels maxLength={3}>
                        <Label icon={IoBriefcaseOutline} text='Work' />
                        <Label icon={LuUserRound} text='Personal' />
                        <Label icon={LuLightbulb} text='Ideas' />
                    </CollectionLabels>
                </section>

                <div className='menu-aside__bottom'>
                    <div className='menu-aside__profile'>
                        <Profile name='Luis' />
                        <div className='menu-aside__profile-text'>
                            <Text as='span' size='small' weight='semibold'>Luis</Text>
                            <Text as='span' size='small' color='secondary'>luis@ghostnotes.app</Text>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
function CollectionNotes () {
    const collectionName = 'All Notes'

    return (
        <section className='collection-notes'>
            <CollectionNotesHeader title={collectionName} count={notes.length} />
            <div className='collection-notes__list'>
                {notes.map((note) => (
                    <Note key={note.id} {...note} />
                ))}
            </div>
        </section>
    )
}
function NoteWrite () {
    const selectedNote = notes[0]

    return (
        <section className='note-write'>
            <NoteWriterHeader note={selectedNote} />
            <TextArea defaultValue={selectedNote.content} />
            <NoteWriterFooter content={selectedNote.content} />
        </section>
    )
}

function NoteWriterFooter ({ content }) {
    const characterCount = content.length
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length

    return (
        <footer className='note-write__footer'>
            <Text as='span' size='small' color='secondary'>
                {wordCount} words&nbsp;&nbsp;{characterCount} characters
            </Text>

            <div className='note-write__footer-actions'>
                <button className='note-write__icon-button' type='button' aria-label='Add tag'>
                    <Icon icon={LuTag} />
                </button>
                <button className='note-write__icon-button' type='button' aria-label='Attach file'>
                    <Icon icon={LuPaperclip} />
                </button>
                <button className='note-write__save-button' type='button'>
                    <span>Save Note</span>
                    <span className='note-write__save-divider' />
                    <Icon icon={LuChevronDown} />
                </button>
            </div>
        </footer>
    )
}

function NoteWriterHeader ({ note }) {
    return (
        <header className='note-write__header'>
            <div className='note-write__title-group'>
                <Text as='span' size='small' color='secondary'>Editing note</Text>
                <Text as='h1' size='h2' weight='semibold'>{note.title}</Text>
            </div>

            <div className='note-write__meta'>
                <Text as='span' size='small' color='secondary'>{note.date}</Text>
                <CollectionTags maxLength={4}>
                    {note.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </CollectionTags>
            </div>
        </header>
    )
}

function CollectionNotesHeader ({ title, count }) {
    return (
        <header className='collection-notes__header'>
            <div className='collection-notes__title'>
                <Text as='h2' size='h2' weight='semibold'>{title}</Text>
                <Text as='span' size='small' color='secondary'>{count} notes</Text>
            </div>
            <Button icon={IoAdd}>New Note</Button>
        </header>
    )
}
