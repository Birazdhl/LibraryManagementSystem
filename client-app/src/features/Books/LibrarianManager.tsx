import React, { useContext, useEffect, SyntheticEvent, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Dropdown, Segment, Item, Icon, Label, Button, Select } from 'semantic-ui-react';
import { BooksStatus } from '../../app/common/options/BookStatus';
import { RootStoreContext } from '../../app/stores/rootStore';
import { format } from 'date-fns';
import { NavLink } from 'react-router-dom';
import { id } from 'date-fns/esm/locale';



const LibrarianManager: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { loadBooks, getAvailableBooks, deleteBook, setStatus, status, filterValues } = rootStore.bookStore;

    // const [status, setStatus] = useState(BooksStatus[0].value);
    // const [BookList, setBookList] = useState(getAvailableBooks)

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    const deleteBooks = (event: SyntheticEvent<HTMLButtonElement>, id: number) => {
        deleteBook(event, id);
    };

    const onChange = (value: any) => {
        setStatus(value)
        console.log(value)

        // if (value === 'requested') {
        //     const filteredBooks = getAvailableBooks.filter(data => data.isRequested == true)
        //     // console.log(filteredBooks)
        //     // setBookList(filteredBooks);
        //     // console.log(BookList)
        // }
    }


    return (
        <div>
            {/* <Dropdown placeholder='Books Status' id="status" search selection
                options={BooksStatus} value={status} onChange={(e) => setStatus(e.target.)} /> */}

            <Select
                value={status}
                onChange={(e, data) => onChange(data.value)}
                options={BooksStatus}
            />

            <Button as={NavLink} to='/addBook' positive content='Add New Book' />
            {filterValues.map(books => (
                <Segment.Group key={books.bookName}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image size='tiny' circular src='/assets/books.jpg' />
                                <Item.Content>
                                    <Item.Header as={NavLink} to={`/booksDetail/${books.id}`} >{books.bookName}</Item.Header>
                                    <Item.Description>
                                        <Label basic color={books.name ? 'red' : books.requestedBy ? 'yellow' : 'green'}>
                                            {books.name ? 'Taken by ' + books.name :
                                                books.requestedBy ? 'Requested By ' + books.requestedBy :
                                                    'Available '
                                            }
                                        </Label>
                                        <Button
                                            onClick={(e) => deleteBooks(e, books.id)}
                                            floated='right'
                                            type='button'
                                            content='Delete'
                                            color='red'
                                        />

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