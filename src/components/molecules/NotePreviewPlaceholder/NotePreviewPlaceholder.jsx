import './NotePreviewPlaceholder.scss';
import ProfileAvatar from "../../atoms/ProfileAvatar/ProfileAvatar.jsx";
import SkeletonLine from "../../atoms/SkeletonLine/SkeletonLine.jsx";

export default function NotePreviewPlaceholder() {
    return (
        <div className="placeholder-note-item">
            <ProfileAvatar />
            <div className="placeholder-note-item__content">
                <SkeletonLine width='70%' variant="wither"/>
                <SkeletonLine width='100%' variant="wither"/>
            </div>
        </div>
    )
}
