import React from 'react';
import { render } from "react-testing-library";
import DropdownMenu from './index';
import { SSL_OP_TLS_BLOCK_PADDING_BUG } from 'constants';

const simpleMenu = [
  {
    "title": "One Fish",
    "url": "#",
  },
  {
    "title": "Two Fish",
    "url": "#",
  },
  {
    "title": "Red Fish",
    "url": "#",
  },
  {
    "title": "Blue Fish",
    "url": "",
  }
]

const menuWithChildren = [
  {
    "title": "One Fish",
    "url": "#",
  },
  {
    "title": "Two Fish",
    "url": "#",
  },
  {
    "title": "Red Fish",
    "url": "#",
    children: [
      {
        title: 'Child 1',
        url: "#"
      },
      {
        title: 'Child 2',
        url: "#"
      },
      {
        title: 'Child 3',
        url: "#"
      }
    ]
  },
  {
    "title": "Blue Fish",
    "url": "",
  }
]


test('it renders a simple array of links', () => {
  const { getByText } = render(<DropdownMenu data={simpleMenu} />);

  expect(getByText("One Fish")).toBeInTheDocument();
  expect(getByText("Two Fish")).toBeInTheDocument();
  expect(getByText("Red Fish")).toBeInTheDocument();
  expect(getByText("Blue Fish")).toBeInTheDocument();
});

test('it renders children', () => {
  const { getByText } = render(<DropdownMenu
    data={menuWithChildren}
    renderChildren={(items) => items.map(child => <a key={child.id} href={child.url}>{child.title}</a>)}
  />);
  expect(getByText("Child 1")).toBeInTheDocument();
  expect(getByText("Child 2")).toBeInTheDocument();
  expect(getByText("Child 3")).toBeInTheDocument();
})

// test('it renders a custom link component', () => {});