# Button

<!-- STORY -->

<hr>

A component for triggering a user action. e.g: a submit button in a form

##### Import

```js
import { Button } from 'your-library-name';
```

##### Usage

```jsx
<Button onClick={() => 'Do something'}>I am a button</Button>
```

##### Required props

| Name       | Type   | Description                 |
| ---------- | ------ | --------------------------- |
| `children` | `node` | e.g: Add a label or an icon |

##### Optional props

| Name         | Type       | Default    | Description               |
| ------------ | ---------- | ---------- | ------------------------- |
| `onClick`    | `function` | `() => {}` |                           |
| `disabled`   | `boolean`  | `false`    |                           |
| `type`       | `string`   | `submit`   |                           |
| `color`      | `string`   | `button`   | `Either an Hex or a name` |
| `dataTestId` | `string`   | `button`   | `specify the action`      |