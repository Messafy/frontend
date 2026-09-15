import './NotesAppPreview.scss';
import PlaceholderNoteItem from "../../molecules/PlaceholderNoteItem/PlaceholderNoteItem.jsx";
import Profile from "../../atoms/Profile/Profile.jsx";
import CollectionLabels from "../../molecules/CollectionLabels/CollectionLabels.jsx";
import Label from '../../atoms/Label/Label.jsx';
import PlaceholderLine from '../../atoms/PlaceholderLIne/PlaceholderLine.jsx';
import { IoDocumentTextOutline, IoPinOutline, IoTrashOutline } from 'react-icons/io5';

export default function NotesAppPreview() {
  return (
    <div className="notes-app-preview" aria-hidden='true'>
      <div className="notes-app-preview__aside">
          <Profile />
          <CollectionLabels>
              <Label icon={IoDocumentTextOutline} aria-label='All notes' />
              <Label icon={IoPinOutline} aria-label='Pinned notes' />
              <Label icon={IoTrashOutline} aria-label='Trash' />
          </CollectionLabels>
      </div>
      <div className="notes-app-preview__main">
          <PlaceholderNoteItem />
          <PlaceholderNoteItem />
          <PlaceholderNoteItem />
          <PlaceholderNoteItem />
          <PlaceholderNoteItem />
          <PlaceholderNoteItem />
          <PlaceholderNoteItem />
      </div>
      <div className="notes-app-preview__editor">
          <div className='notes-app-preview__editor-heading'>
              <PlaceholderLine width='38%' variant='white' />
              <PlaceholderLine width='24%' variant='wither' />
          </div>

          <div className='notes-app-preview__editor-paragraph'>
              <PlaceholderLine width='100%' variant='wither' />
              <PlaceholderLine width='91%' variant='wither' />
              <PlaceholderLine width='96%' variant='wither' />
              <PlaceholderLine width='67%' variant='wither' />
          </div>

          <div className='notes-app-preview__editor-paragraph'>
              <PlaceholderLine width='87%' variant='wither' />
              <PlaceholderLine width='54%' variant='wither' />
          </div>

          <div className='notes-app-preview__editor-checklist'>
              <div className='notes-app-preview__editor-check'>
                  <span />
                  <PlaceholderLine width='44%' variant='wither' />
              </div>
              <div className='notes-app-preview__editor-check'>
                  <span />
                  <PlaceholderLine width='58%' variant='wither' />
              </div>
              <div className='notes-app-preview__editor-check'>
                  <span />
                  <PlaceholderLine width='47%' variant='wither' />
              </div>
          </div>

          <div className='notes-app-preview__editor-paragraph'>
              <PlaceholderLine width='94%' variant='wither' />
              <PlaceholderLine width='100%' variant='wither' />
              <PlaceholderLine width='82%' variant='wither' />
              <PlaceholderLine width='56%' variant='wither' />
          </div>
      </div>
    </div>
  );
}
