import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';

import Paginate, { Props } from '.';

const generateElements = (count: number) => {
    const data: Array<ReactElement> = [];

    for (let i = 1; i <= count; i++) {
        data.push(<div key={i}>Element #{i}</div>);
    }

    return data;
};

describe('Paginate', () => {
    let props: Props;

    beforeEach(() => {
        props = {
            pageSize: 5,
            data: generateElements(10),
        };
    });

    describe('render()', () => {
        it('renders a submit button', () => {
            const { container } = render(<Paginate {...props} />);
            expect(container.firstChild).toMatchSnapshot(`
        <div class="krp">
            <div class="krp__list">
                <div>Element #1</div>
                <div>Element #2</div>
                <div>Element #3</div>
                <div>Element #4</div>
                <div>Element #5</div>
            </div>
            <div class="krp__pagination">
                <ul class="krp__pagination-list pagination-1-2-3">
                    <li><button>prev</button></li>
                    <li class="active-1-2-4"><button>1</button></li>
                    <li class=""><button>2</button></li>
                    <li><button>next</button></li>
                </ul>
            </div>
        </div>
      `);
        });
    });
});
