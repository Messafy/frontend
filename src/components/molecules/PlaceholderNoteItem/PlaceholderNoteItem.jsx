import './PlaceholderNoteItem.scss';
import Profile from "../../atoms/Profile/Profile.jsx";
import PlaceholderLine from "../../atoms/PlaceholderLIne/PlaceholderLine.jsx";

export default function PlaceholderNoteItem() {
    return (
        <div className="placeholder-note-item">
            <Profile />
            <div className="placeholder-note-item__content">
                <PlaceholderLine width='70%' variant="wither"/>
                <PlaceholderLine width='100%' variant="wither"/>
            </div>
        </div>
    )
}
