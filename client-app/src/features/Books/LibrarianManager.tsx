import React, { useContext, useEffect, SyntheticEvent, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Segment, Item, Icon, Label, Button, Select } from 'semantic-ui-react';
import { BooksStatus } from '../../app/common/options/BookStatus';
import { RootStoreContext } from '../../app/stores/rootStore';
import { format } from 'date-fns';
import { NavLink } from 'react-router-dom';
import { id } from 'date-fns/esm/locale';
import { IRequestReject } from '../../app/models/bookStatus';
import { IBooks } from '../../app/models/books';



const LibrarianManager: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { loadBooks, deleteBook, setStatus, status, filterValues, approveRejectRequests, submitting, target } = rootStore.bookStore;

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    const deleteBooks = (event: SyntheticEvent<HTMLButtonElement>, id: number) => {
        deleteBook(event, id);
    };

    const onChange = (value: any) => {
        setStatus(value)
    }

    const bookReturn = () => {
        console.log("Lionel");
    }

    const approveRejectRequest = (e: SyntheticEvent<HTMLButtonElement>, book: IBooks, appReq: string) => {

        var bookStatus: IRequestReject = {
            id: book.id,
            bookname: book.bookName,
            approveorreject: appReq,
            returndate: 15,
            name: book.requestedBy,
            emailAddress: book.requestedEmail
        };
        approveRejectRequests(e, bookStatus)
        // console.log(book)
    }

    const timeDiff = (t2: Date) => {
        if (!(t2 instanceof Date)) t2 = new Date(t2);
        const t1 = new Date();
        const dateDiff = Math.floor(t2.getTime() - t1.getTime());
        var day = 1000 * 60 * 60 * 24
        return Math.floor(dateDiff / day);
    }

    return (
        <div>
            <Select
                value={status}
                onChange={(e, data) => onChange(data.value)}
                options={BooksStatus}
            />

            <Button as={NavLink} to='/addBook' positive content='Add New Book' />
            {filterValues.map(books => (
                <Segment.Group key={books.id}>
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
                                        {books.name && <Button onClick={() => bookReturn()} type='button' content={`Returned By ${books.name}`} size='small' />}
                                        <Button
                                            onClick={(e) => deleteBooks(e, books.id)}
                                            floated='right'
                                            type='button'
                                            content='Delete'
                                            color='red'
                                            size='small'
                                        />

                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                    {books.name ?
                        <Segment>
                            <Icon name='clock' /> Expiry Date :- {format(books.returnDate, 'eeee do MMMM')}
                            <Icon name='hourglass start' />Remaining Time:- {timeDiff(books.returnDate)}

                        </Segment> : null
                    }
                    {
                        books.requestedBy ?
                            <Segment>

                                <Button
                                    name={`approve${books.bookName}`}
                                    loading={target === ('approve' + books.bookName) && submitting}
                                    color='green'
                                    type='button'
                                    onClick={(e) => approveRejectRequest(e, books, 'approve')}
                                    content='Approve Request'
                                    size='small' />

                                <Button
                                    name={`reject${books.bookName}`}
                                    loading={target === ('reject' + books.bookName) && submitting}
                                    color='red'
                                    type='button'
                                    onClick={(e) => approveRejectRequest(e, books, 'reject')}
                                    content='Disapprove Request'
                                    size='small' />

                            </Segment> : null

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