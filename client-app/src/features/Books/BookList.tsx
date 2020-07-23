import React, { useContext, useEffect } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import { Segment, Item, Icon, Button } from 'semantic-ui-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const BookList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadBooks, getAvailableBooks } = rootStore.bookStore;

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    return (
        <div>
            {/* {console.log(getAvailableBooks)} */}
            {getAvailableBooks.map(books => (
                <Segment.Group key={books.bookName}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image size='tiny' circular src='/assets/user.png' />
                                <Item.Content>
                                    <Item.Header as='a'>{books.bookName}</Item.Header>
                                    <Item.Description>Hosted by Bob</Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                    <Segment>
                        <Icon name='clock' />
                        <Icon name='marker' />
                    </Segment>
                    <Segment secondary>Attendees will go here</Segment>
                    <Segment clearing>
                        <span></span>
                        {/* <Button
                            as={Link}
                            to={`/activities/${activity.id}`}
                            floated='right'
                            content='View'
                            color='blue'
                        /> */}
                    </Segment>
                </Segment.Group>
            ))}


        </div>
    )
}

export default observer(BookList);