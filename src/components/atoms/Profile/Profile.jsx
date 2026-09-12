import './Profile.scss';

export default function Profile({src, alt, name = 'U'}) {
    return (
      <div className="profile">
          {src ? <img src={src} alt={alt || name} /> : <span>{name.charAt(0).toUpperCase()}</span>}
      </div>
    );
}