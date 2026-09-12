import './Link.scss'

export default function Link({ children, href, ...props}) {
    return (
        <a className='link' href={href} {...props}>
            {children}
        </a>
    )
}