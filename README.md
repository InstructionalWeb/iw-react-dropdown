# iw-react-dropdown
React Dropdown Menu Component

We developed this component for use in our projects. It was originally designed to receive data from a WordPress REST API, but it can take any array of menu objects and will render a menu from it.

Since the data was originally coming from WordPress, items with children are turned into a dropdown menu item and the parent is converted into a button that toggles the dropdown state for the children.

[CodeSandbox Demo](https://codesandbox.io/s/6280k03oqr)

## Menu Data
```javascript
const menuData = [
  {
    title: 'One Fish',
    url: '#',
  },
  {
    title: 'Two Fish',
    url: '#',
  },
  {
    title: 'Red Fish',
    url: '#',
  },
  {
    title: 'Blue Fish',
    url: '#',
    children: [
      {
        title: 'This is a dropdown menu item',
        url: '#'
      },
      {
        title: 'So is this'
        url: '#'
      }
    ]
  }
]
```

## Classes

The component doesn't include much css by default, but does include these classes to style the menu as needed.

```css
.iw-dropdown {}
.iw-dropdown__menu {}
.iw-dropdown__menuItem {}
.iw-dropdown__menuLink {}
.iw-dropdown__menuToggle {}
.iw-dropdown__submenuWrapper {}
.iw-dropdown__submenu {}
.iw-dropdown__subItem {}
.iw-dropdown__subLink {}
```