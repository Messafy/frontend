import './NotePage.scss';
import Card from "../../molecules/Card/Card.jsx";
import Link from "../../atoms/Link/Link.jsx";
import Button from "../../atoms/Button/Button.jsx";
import Input from "../../atoms/Input/Input.jsx";
import TextArea from "../../atoms/TextArea/TextArea.jsx";
import Profile from "../../atoms/Profile/Profile.jsx";
import Badge from "../../atoms/Badge/Badge.jsx";
import Tag from "../../atoms/Tag/Tag.jsx";
import CollectionTags from "../../molecules/CollectionTags/CollectionTags.jsx";
import Text from '../../atoms/Text/Text.jsx'
import Date from "../../atoms/Date/Date.jsx";
import Note from "../../organisms/Note/Note.jsx";
import Icon from "../../atoms/Icon/Icon.jsx";
import {IoAdd, IoDocumentTextOutline, IoPinOutline, IoTrashOutline} from "react-icons/io5";
import Label from "../../atoms/Label/Label.jsx";
import CollectionLinks from "../../molecules/CollectionLinks/CollectionLinks.jsx";
import CollectionLabels from "../../molecules/CollectionLabels/CollectionLabels.jsx";
import FloatingTextToolbar from "../../organisms/FloatingTextToolbar/FloatingTextToolbar.jsx";

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

        </aside>
    )
}
function CollectionNotes () {
    return (
        <section className='collection-notes'>

        </section>
    )
}
function NoteWrite () {
    return (
        <section className='note-write'>

        </section>
    )
}