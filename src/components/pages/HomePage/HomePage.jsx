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
import Text from '../../atoms/Text/Text.jsx'

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
            <Text as='h1' size='h1' weight='bold'>Hola que tal estas</Text>
            <Text as='h2' size='h2' weight='semibold' muted>Hola que tal estas</Text>
            <Text as='h3' size='h3' weight='semibold' muted>Hola que tal estas</Text>
            <Text as='h4' size='body' weight='semibold' color='secondary' muted>Hola que tal estas</Text>
        </main>
    )
}
