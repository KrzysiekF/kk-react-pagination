import React, { ReactElement } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
// import { action } from '@storybook/addon-actions';

// import README from './README.md';
import Paginate from '.';

const stories = storiesOf('Paginate', module);

stories.addDecorator(withKnobs);
stories.addParameters({
    readme: {
        // content: README,
    },
});

stories.add('default', () => {
    const data: Array<ReactElement> = [];

    for (let i = 0; i < 15; i++) {
        data.push(<div>Element #{i + 1} </div>);
    }

    return <Paginate data={data} />;
});
