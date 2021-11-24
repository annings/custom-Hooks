/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable react/no-multi-comp */
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useToggle } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
    const [mounted, toggleMounted] = useToggle(true);

    return (
        <div>
            <p>
                This demo provides a number in a promise that resolves in 1sec
                to a child component.
            </p>
            <button onClick={() => toggleMounted()}>
                {mounted ? 'Unmount' : 'Mount'}
            </button>
            <br />
        </div>
    );
};

storiesOf('Lifecycle/usePromise', module)
    .add('Docs', () => <ShowDocs md={require('../docs/usePromise.md')} />)
    .add('Demo', () => <Demo />);
