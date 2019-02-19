import React from 'react';
import { render, fireEvent, wait } from "react-testing-library";
import DropdownMenu from '../src/index';

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
  expect(getByText("One Fish")).toHaveAttribute('class', 'iw-dropdown__menuLink');
  expect(getByText("Two Fish")).toBeInTheDocument();
  expect(getByText("Two Fish")).toHaveAttribute('class', 'iw-dropdown__menuLink')
  expect(getByText("Red Fish")).toBeInTheDocument();
  expect(getByText("Red Fish")).toHaveAttribute('class', 'iw-dropdown__menuLink')
  expect(getByText("Blue Fish")).toBeInTheDocument();
  expect(getByText("Blue Fish")).toHaveAttribute('class', 'iw-dropdown__menuLink')
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

test('it toggles children visibility on and off', () => {
  const { getByText } = render(<DropdownMenu
    data={menuWithChildren}
    renderChildren={(items) => items.map(child => <a key={child.id} href={child.url}>{child.title}</a>)}
  />);

  const wrapper = document.querySelector('.iw-dropdown__submenuWrapper');
  const toggle = getByText('Red Fish');

  expect(toggle).toBeInTheDocument();
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).not.toHaveAttribute('class', 'active');

  expect(wrapper).toHaveAttribute('aria-expanded', 'false');
  expect(wrapper).not.toHaveAttribute('class', 'open');

  fireEvent.click(toggle, { bubbles: false });
  wait(() => {
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAttribute('class', 'active');

    expect(wrapper).tohaveAttribute('aria-expanded', 'true');
    expect(wrapper).toHaveAttribute('class', 'open');
  }, { timeout: 100 })
});

test('it renders a custom link component', () => {
  const { getByText } = render(<DropdownMenu data={simpleMenu} renderLink={(data) => <a href={data.url} className="customLink">{data.title}</a>} />);
  expect(getByText("One Fish")).toBeInTheDocument();
  expect(getByText("One Fish")).toHaveAttribute('class', 'iw-dropdown__menuLink customLink');
});
