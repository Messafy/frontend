import Input from '../../atoms/Input/Input.jsx'
import './HomePage.scss'
import Button from "../../atoms/Button/Button.jsx";
import Link from "../../atoms/Link/Link.jsx";
import TextArea from "../../atoms/TextArea/TextArea.jsx";
import Profile from "../../atoms/Profile/Profile.jsx";
import Card from "../../molecules/Card/Card.jsx";
import Badge from "../../atoms/Badge/Badge.jsx";
import Rain from "../../molecules/Rain/Rain.jsx";
import Title from "../../atoms/Title/Title.jsx";

export default function HomePage () {
    return (
        <main >
            <Rain />
            <Title />
            <Card>
                <Link href='/'>Welcome</Link>
            </Card>
            <Button>Welcome</Button>
            <Input></Input>
            <TextArea></TextArea>
            <Profile></Profile>
            <Badge>Welcome</Badge>
            <h1>Hola que tal estas</h1>
            <h2>Hola que tal estas</h2>
            <h3>Hola que tal estas</h3>
            <h4>Hola que tal estas</h4>
        </main>
    )
}
