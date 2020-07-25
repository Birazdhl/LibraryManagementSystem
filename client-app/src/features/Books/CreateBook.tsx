import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { ActivityFormValues } from '../../app/models/activity';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../app/common/form/TextInput';
import TextAreaInput from '../../app/common/form/TextAreaInput';
import SelectInput from '../../app/common/form/SelectInput';
import DateInput from '../../app/common/form/DateInput';
import { category } from '../../app/common/options/categoryOptions';
import { combineDateAndTime } from '../../app/common/util/util';
import {
    combineValidators,
    isRequired,
    composeValidators,
    hasLengthGreaterThan
} from 'revalidate';
import { RootStoreContext } from '../../app/stores/rootStore';

const validate = combineValidators({
    bookName: isRequired({ message: 'The Book Name is required' })
});

interface DetailParams {
    id: string;
}

const CreateBookForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {
    const rootStore = useContext(RootStoreContext);
    const {
        createBook,
        // editActivity,
        submitting,
        // loadActivity
    } = rootStore.bookStore;

    const [loading, setLoading] = useState(false);

    const handleFinalFormSubmit = (values: any) => {
        createBook(values.bookName);

    };

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        onSubmit={handleFinalFormSubmit}
                        render={({ handleSubmit, invalid, pristine }) => (
                            <Form onSubmit={handleSubmit} loading={loading}>
                                <Field
                                    name='bookName'
                                    placeholder='Enter a New Book Name'
                                    component={TextInput}
                                />
                                <Button
                                    loading={submitting}
                                    disabled={loading || invalid || pristine}
                                    floated='right'
                                    positive
                                    type='submit'
                                    content='Submit'
                                />
                                <Button
                                    onClick={() => history.push(`/booklist`)}
                                    disabled={loading}
                                    floated='right'
                                    type='button'
                                    content='Cancel'
                                />
                            </Form>
                        )}
                    />
                </Segment>
            </Grid.Column>
        </Grid>
    );
};

export default observer(CreateBookForm);
