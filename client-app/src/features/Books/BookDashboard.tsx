import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Select, Segment, Dropdown } from 'semantic-ui-react'
import { BooksStatus } from '../../app/common/options/BookStatus'
import { RootStoreContext } from '../../app/stores/rootStore'
import BookList from './BookList'
import LibrarianManager from './LibrarianManager'

const BookDashboard: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { loadBooks, deleteBook, setStatus, status, filterValues, approveRejectRequests, submitting, target } = rootStore.bookStore;

    const onChange = (value: any) => {
        setStatus(value)
    }

    var userRole = 'admin';

    return (
        <div>

            <Dropdown
                selectOnNavigation={false}
                selection
                name='false'
                options={BooksStatus}
                value={status}
                onChange={(e, data) => onChange(data.value)}
            />
            {userRole === 'user' ? <BookList /> : <LibrarianManager />}

        </div>

    )
}


export default observer(BookDashboard)
