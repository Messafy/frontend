import './NotePage.scss';
import Card from "../../molecules/Card/Card.jsx";
import Link from "../../atoms/Link/Link.jsx";
import Button from "../../atoms/Button/Button.jsx";
import Input from "../../atoms/Input/Input.jsx";
import TextArea from "../../atoms/TextArea/TextArea.jsx";
import Profile from "../../atoms/Profile/Profile.jsx";
import Badge from "../../atoms/Badge/Badge.jsx";
import Tag from "../../atoms/Tag/Tag.jsx";
import CollectionTags from "../../molecules/CollectionTags/CollectionTags.jsx";

export default function NotePage() {
    return <div>
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
        <CollectionTags maxLength={3}>
            <Tag>Bienvenido usuario</Tag>
            <Tag>Bienvenido usuario</Tag>
            <Tag>Bienvenido usuario</Tag>
            <Tag>Bienvenido usuario</Tag>
            <Tag>Bienvenido usuario</Tag>
            <Tag>Bienvenido usuario</Tag>
            <Tag>Bienvenido usuario</Tag>
            <Tag>Bienvenido usuario</Tag>
        </CollectionTags>
    </div>
}
