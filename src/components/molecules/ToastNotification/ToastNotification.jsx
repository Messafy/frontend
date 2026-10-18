import { useEffect } from 'react'
import { IoClose, IoCheckmarkCircle } from 'react-icons/io5'

import TimedProgressBar from '../../atoms/TimedProgressBar/TimedProgressBar.jsx'
import './ToastNotification.scss'

export default function ToastNotification({ type = 'success', title, children, onClose }) {
  useEffect(() => {
    const timeoutId = window.setTimeout(onClose, 5000)
    return () => window.clearTimeout(timeoutId)
  }, [onClose])

  return (
    <section className={`notification-toast notification-toast--${type}`} role='status' aria-live='polite'>
      <IoCheckmarkCircle className='notification-toast__icon' aria-hidden='true' />
      <div className='notification-toast__content'>
        {title && <strong className='notification-toast__title'>{title}</strong>}
        <p className='notification-toast__message'>{children}</p>
      </div>
      <button className='notification-toast__close' type='button' onClick={onClose} aria-label='Close notification'>
        <IoClose aria-hidden='true' />
      </button>
      <TimedProgressBar duration={5000} />
    </section>
  )
}
