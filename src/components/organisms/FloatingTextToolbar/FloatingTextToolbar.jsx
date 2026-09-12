import './FloatingTextToolbar.scss'
import { LuBold, LuItalic, LuLink, LuStrikethrough, LuUnderline } from 'react-icons/lu'
import Icon from '../../atoms/Icon/Icon.jsx'
import VerticalSeparator from '../../atoms/VerticalSeparator/VerticalSeparator.jsx'

export default function FloatingTextToolbar() {
    return (
        <div className='floating-text-toolbar' role='toolbar' aria-label='Text formatting'>
            <button className='floating-text-toolbar__button' type='button' aria-label='Bold'>
                <Icon className='bubble' icon={LuBold} />
            </button>
            <button className='floating-text-toolbar__button' type='button' aria-label='Italic'>
                <Icon className='bubble' icon={LuItalic} />
            </button>
            <button className='floating-text-toolbar__button' type='button' aria-label='Underline'>
                <Icon className='bubble' icon={LuUnderline} />
            </button>
            <button className='floating-text-toolbar__button' type='button' aria-label='Strikethrough'>
                <Icon className='bubble' icon={LuStrikethrough} />
            </button>
            <VerticalSeparator />
            <button className='floating-text-toolbar__button' type='button' aria-label='Link'>
                <Icon className='bubble' icon={LuLink} />
            </button>
        </div>
    )
}
