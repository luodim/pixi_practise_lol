# babel-plugin-transform-functional-jsx
Pure functional & [spread children](https://github.com/facebook/jsx/pull/59) support


## Example

In
```js
<div>
  <a href="other.html">Link</a>
  <ul>
    {...[<li>Item A</li>, <li>Item B</li>]}
    <li>Item Last</li>
  </ul>
</div>
```

Out
```js
div(
  null,
  a({ href: "other.html" }, "Link"),
  ul(
    null,
    ...[li(null, "Item A"), li(null, "Item B")],
    li(null, "Item Last")
  )
);
```
