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
            <h1>List of Available Books</h1>
            {getAvailableBooks.map(books => (
                <Segment.Group key={books.bookName}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image size='tiny' circular src='/assets/books.jpg' />
                                <Item.Content>
                                    <Item.Header as='a'>{books.bookName}</Item.Header>
                                    <Item.Description>
                                        <Button loading={false}
                                            color='green'
                                            type='button'
                                            content='Request For Book' />

                                        <Button loading={false}
                                            color='red'
                                            type='button'
                                            content='Cancel Request' />

                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>

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