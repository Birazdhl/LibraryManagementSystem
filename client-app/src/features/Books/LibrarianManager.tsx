import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { Dropdown, Segment, Item, Icon, Label, Button } from 'semantic-ui-react';
import { BooksStatus } from '../../app/common/options/BookStatus';
import { RootStoreContext } from '../../app/stores/rootStore';
import { format } from 'date-fns';



const LibrarianManager: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { loadBooks, getAvailableBooks } = rootStore.bookStore;

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);


    return (
        <div>
            <Dropdown placeholder='Books Status' search selection options={BooksStatus} defaultValue={BooksStatus[0].value} />
            {console.log(getAvailableBooks)}
            {getAvailableBooks.map(books => (
                <Segment.Group key={books.bookName}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image size='tiny' circular src='/assets/books.jpg' />
                                <Item.Content>
                                    <Item.Header as='a'>{books.bookName}</Item.Header>
                                    <Item.Description>
                                        <Label basic color={books.name ? 'red' : books.requestedBy ? 'yellow' : 'green'}>
                                            {books.name ? 'Taken by ' + books.name :
                                                books.requestedBy ? 'Requested By ' + books.requestedBy :
                                                    'Available '
                                            }
                                        </Label>

                                    </Item.Description>
                                    {/* <Item.Description>Requested by {books.requestedBy ? books.requestedBy : 'No One'}</Item.Description> */}
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                    {books.name ?
                        <Segment>
                            <Icon name='clock' /> Expiry Date :- {format(books.returnDate, 'eeee do MMMM')}
                        </Segment> : null
                    }
                    {
                        books.requestedBy ?
                            <Segment>

                                <Button loading={false}
                                    color='green'
                                    type='button'
                                    content='Approve Request' />

                                <Button loading={false}
                                    color='red'
                                    type='button'
                                    content='Disapprove Request' /> </Segment> : null

                    }
                    <Segment clearing>
                        <span></span>
                    </Segment>
                </Segment.Group>
            ))}
        </div>
    )
}

export default observer(LibrarianManager);