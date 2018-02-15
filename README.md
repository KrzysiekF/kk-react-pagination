# KK React Pagination

[![npm package](https://img.shields.io/npm/v/kk-react-pagination.png?style=flat-square)](https://www.npmjs.org/package/kk-react-pagination)
[![Travis](https://travis-ci.org/KrzysiekF/kk-react-pagination.svg?style=flat-square)](https://travis-ci.org/KrzysiekF/kk-react-pagination)
[![Coverage Status](https://coveralls.io/repos/github/KrzysiekF/kk-react-pagination/badge.svg?branch=master&style=flat-square)](https://coveralls.io/github/KrzysiekF/kk-react-pagination?branch=master)


Pagination component for ReactJS


KK React Pagination
===================

Installation / Download
-----------------------

#### NPM
`npm install --save kk-react-pagination`
                
Import
--------
#### ES6:
`import Pagination from 'kk-react-pagination';`

`import 'kk-react-pagination/lib/assets/style.css';`

(optional) `import 'kk-react-pagination/lib/assets/templates/simple.css';`

Examples
--------
`<pagination name="demo"> (content) </pagination>`

[(More examples you can find here)](https://krzysiekf.github.io/kk-react-pagination/)

Options
-------

| option      | default         | description |
|-------------|-----------------|-------------|
| `name`      | `''` (`string`) |             |
| `pageSize`  | `5` (`number`)  |             |
| `startPage` | `1` (`number`)  |             |
| `prevLabel` | `prev` (`string`)  |             |
| `nextLabel` | `next` (`string`)  |             |
| `align` | `center` (`string`)  | `left ; center ; right` |
| `onePageHide` | `false ` (`bool`)  | Hide pagination when is only one page. |
| `openPageByElementId` | `0` (`number`)  | Must be unique. |
| `displayedPages` | `5` (`number`)  | How many page numbers should be visible while navigating. |
| `request` | `Function` (`Promice`)  | The function that sends a request to the server and returns Promise. |
| `component` | `Function` (`ReactJS Component`)  | This component will be used to render a single line from the list. Data provided by the server will be injected into it as properties. |
| `elementListClass` | `''` (`string`)  | Additional class on the tag containing the list of elements. |
