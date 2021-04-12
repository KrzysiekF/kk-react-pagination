import { createUseStyles } from 'react-jss';
import globalStyles from '../../style/globalStyle';

export default createUseStyles(() => ({
    pagination: {
        listStyle: 'none',
        fontSize: '1rem',
        padding: 0,
        margin: 0,
        textAlign: 'left',
        '& li': {
            display: 'inline-block',
        },
        '& button': {
            fontSize: '1rem',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            margin: 0,
            padding: '0.5em 0',
            textAlign: 'center',
            width: '1.5em',
        },
        '& li:first-child button': {
            width: 'auto',
        },
        '& li:last-child button': {
            width: 'auto',
        },
    },
    active: {
        '& button': {
            color: globalStyles.colorPrimary,
        },
    },
}));
