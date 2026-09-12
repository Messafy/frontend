import Input from '../../atoms/Input/Input.jsx'
import './HomePage.scss'
import Button from "../../atoms/Button/Button.jsx";
import Link from "../../atoms/Link/Link.jsx";
import TextArea from "../../atoms/TextArea/TextArea.jsx";
import Profile from "../../atoms/Profile/Profile.jsx";
import Card from "../../molecules/Card/Card.jsx";
import Badge from "../../atoms/Badge/Badge.jsx";
import Rain from "../../molecules/Rain/Rain.jsx";

export default function HomePage () {
    return (
        <main className='home-page'>
            <Rain />
            <div className='home-page__content'>
                <Card>
                    <div className='home-page__header'>
                        <div className='home-page__user'>
                            <Profile name='Luis' />
                            <Link href='#'>Welcome</Link>
                        </div>
                    </div>

                    <div className='home-page__body'>
                        <Input placeholder='Título de la nota...' />
                        <TextArea placeholder='Escribe tu nota aquí...' />
                    </div>

                    <div className='home-page__footer'>
                        <Button>Guardar</Button>
                    </div>
                    <Link href='#'>Ver todas las notas</Link>
                    <Badge text='Bienvenidos usuarios' variant='primary' />
                </Card>
            </div>
        </main>
    )
}
