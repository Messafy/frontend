import Input from '../../atoms/Input/Input.jsx'
import './HomePage.scss'
import Button from "../../atoms/Button/Button.jsx";
import Link from "../../atoms/Link/Link.jsx";
import TextArea from "../../atoms/TextArea/TextArea.jsx";

export default function HomePage () {
    return (
        <main className='home-page'>
            <Input placeholder='Escribe una nota...' />
            <Button>Guardar</Button>
            <Link>Welcome</Link>
            <TextArea></TextArea>
        </main>
    )
}
