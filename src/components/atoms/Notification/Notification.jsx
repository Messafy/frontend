import './Notification.scss'

export default function Notification({type = 'warning', children}) {
  let types = ['warning', 'error', 'success']
  return (
    <div className={`notification notification--${types.includes(type) ? type : 'warning'}`}>
      {children}
    </div>
  )
}
