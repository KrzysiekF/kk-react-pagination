import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Paginate, { Props } from '.';

describe('Paginate', () => {
    let props: Props;

    beforeEach(() => {
        props = {
            children: <div>I am a button</div>,
            onClick: jest.fn(),
            disabled: false,
            type: 'submit',
            color: '',
            dataTestId: 'button',
        };
    });

    describe('actions', () => {
        it('triggers the callback when clicked', () => {
            const { getByTestId } = render(<Button {...props} />);
            const button = getByTestId('button');

            fireEvent.click(button);

            expect(props.onClick).toHaveBeenCalledTimes(1);
        });

        it('does not trigger the callback when clicked if the button is disabled', () => {
            props.disabled = true;
            const { getByTestId } = render(<Button {...props} />);
            const button = getByTestId('button');

            fireEvent.click(button);

            expect(props.onClick).toHaveBeenCalledTimes(0);
        });
    });

    describe('render()', () => {
        it('renders a submit button', () => {
            const { container } = render(<Button {...props} />);
            expect(container.firstChild).toMatchInlineSnapshot(`
        <button
          class="root-0-2-1 root-d2-0-2-5"
          data-testid="button"
          type="submit"
        >
          <span
            class="label-0-2-2"
          >
            <div>
              I am a button
            </div>
          </span>
        </button>
      `);
        });

        it('renders a reset button', () => {
            props.type = 'reset';

            const { container } = render(<Button {...props} />);
            expect(container.firstChild).toMatchInlineSnapshot(`
        <button
          class="root-0-2-1 root-d3-0-2-6"
          data-testid="button"
          type="reset"
        >
          <span
            class="label-0-2-2"
          >
            <div>
              I am a button
            </div>
          </span>
        </button>
      `);
        });
    });
});
