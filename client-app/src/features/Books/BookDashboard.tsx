import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Select } from 'semantic-ui-react'
import { BooksStatus } from '../../app/common/options/BookStatus'
import { RootStoreContext } from '../../app/stores/rootStore'
import BookList from './BookList'

const BookDashboard: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { loadBooks, deleteBook, setStatus, status, filterValues, approveRejectRequests, submitting, target } = rootStore.bookStore;

    const onChange = (value: any) => {
        setStatus(value)
    }

    return (
        <div>
            <Select
                value={status}
                onChange={(e, data) => onChange(data.value)}
                options={BooksStatus}
            />

            <BookList />

        </div>
    )
}


export default observer(BookDashboard)
