import { Avatar, Card, CardContent, CardHeader, List, ListItem } from "@material-ui/core"
import { useSelector } from "react-redux"

export const LeaderBoard = () => {
    let users = useSelector(state => state.users)
    let usersIds = Object.keys(users).sort((a, b) => ((Object.keys(users[b].answers).length + users[b].questions.length)
        -
        (Object.keys(users[a].answers).length + users[a].questions.length)))
    return (
        <div className='home'>
            <List>
                {
                    usersIds.map(id =>
                        <ListItem key={id}>
                            <Card>
                                <CardHeader style={{ fontSize: 'large', textAlign: 'left', fontWeight: 'bold' }} title={`${users[id].name}`} avatar={<Avatar src={`/${id}.png`} />}></CardHeader>
                                <CardContent>
                                    <span style={{ display: 'block', margin: '20px' }}>{`Answered Questions: ${Object.keys(users[id].answers).length}`}</span>
                                    <span style={{ borderBottom: '3px solid crimson', display: 'block', margin: '20px' }}></span>
                                    <span style={{ display: 'block', margin: '20px' }}>{`Created Questions: ${ Object.keys(users[id].questions).length}`}</span>
                                    <div style={{border: '3px solid crimson',display:'block',margin:'30px',textAlign:'center',padding:'4px'}}>{`SCORE: ${Object.keys(users[id].answers).length+Object.keys(users[id].questions).length}`}</div>
                                </CardContent>
                            </Card>
                        </ListItem>)
                }
            </List>
        </div>
    )
}