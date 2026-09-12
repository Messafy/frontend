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
import Text from '../../atoms/Text/Text.jsx'
import Date from "../../atoms/Date/Date.jsx";
import Note from "../../organisms/Note/Note.jsx";
import Icon from "../../atoms/Icon/Icon.jsx";
import {IoAdd, IoDocumentTextOutline, IoPinOutline, IoTrashOutline} from "react-icons/io5";
import Label from "../../atoms/Label/Label.jsx";
import CollectionLinks from "../../molecules/CollectionLinks/CollectionLinks.jsx";
import CollectionLabels from "../../molecules/CollectionLabels/CollectionLabels.jsx";
import FloatingTextToolbar from "../../organisms/FloatingTextToolbar/FloatingTextToolbar.jsx";

export default function NotePage() {
    return <div>
        <Card>
            <Link href='/'>Welcome</Link>
        </Card>
        <Button>Welcome</Button>
        <Input placeholder="Escribe aqui..."></Input>
        <TextArea></TextArea>
        <Profile></Profile>
        <Badge>Welcome</Badge>
        <Text as='h1' size='h1' weight='bold'>Hola que tal estas</Text>
        <Text as='h2' size='h2' weight='semibold' muted>Hola que tal estas</Text>
        <Text as='h3' size='h3' weight='semibold' muted>Hola que tal estas</Text>
        <Text as='h4' size='body' weight='semibold' color='secondary' muted>Hola que tal estas</Text>
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
        <Date date={"2026-04-10"}/>
        <Note
            tags={['Bienvenido usuario', 'Bienvenido usuario', 'Bienvenido usuario']}
            title="Exploration Ideas"
            date="2026-04-20"
            content="Lorem ipsum dolor sit amet
     consectetur adipiscing elit. Integer nec
     odio nec dui euismod tincidunt.
     Pellentesque rhoncus commodo velit, eget
     pretium purus ultrices in. Crasullamcorper
     metus vel neque cursus, a condimentum nibh
     feugiat. Sed venenatis purus vel nisl
     commodo, non posuere est sodales. Curabitur
     tristiqueurna sed turpis aliquam, et
     commodo eros luctus. Maecenas suscipit
     lectus a unaullamcorper, non sodales arcu
     fringilla. Phasellus interdum, neque sed
     convallis tristique, neque velit
     pellentesque justo, a faucibus urna magna
     ut lorem. Fusce vehicula dolor non felis
     faucibus, vel facilisisurna facilisis. Sed
     at libero nec purus ultrices ultricies.
     Nullam dignissim felis eu magna dictum, et
     iaculis neque dapibus. Vivamus hendrerit
     sapien a velit bibendum, vitae dignissim
     magna feugiat."
        />
        <Icon className='animated' icon={IoAdd}/>
        <Label icon={IoAdd} text="Add note"/>
        <CollectionLabels maxLength={3}>
            <Label icon={IoDocumentTextOutline} text="All Notes"/>
            <Label icon={IoPinOutline} text="Pinned Notes"/>
            <Label icon={IoTrashOutline} text="Trash"/>
        </CollectionLabels>
        <CollectionLinks maxLength={3}>
            <Link href='/'>Welcome</Link>
            <Link href='/'>Welcome</Link>
            <Link href='/'>Welcome</Link>
        </CollectionLinks>
        <FloatingTextToolbar/>
    </div>
}
