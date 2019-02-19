import React from "react";
import styled from "styled-components";
import uuid4 from "uuid/v4";
import Dropdown from "./dropdown";

const StyledNav = styled.nav``;

const List = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

class DropdownMenu extends React.Component {
  state = {
    reset: null,
    activeItem: false
  };

  componentWillMount() {
    // make sure all menu items have an id
    this.props.data.map(item => {
      if (!item.hasOwnProperty('id')) {
        item.id = uuid4();
      }

      return item;
    });
  }

  componentDidMount() {
    window.addEventListener("click", event => {
      // console.log("there was a click 1", event.target);
      // console.log(this.nav.contains(event.target));

      if (!this.nav.contains(event.target)) {
        this.resetMenu();
      }
    });

    // reset on escape key
    window.addEventListener("keydown", event => {
      console.log("keyboard event", event.type, event.keyCode);
      if (event.type === "keydown" && event.keyCode === 27) {
        this.resetMenu();
      }
    });
  }

  setActiveItem = name => {
    this.setState({
      reset: null,
      activeItem: name
    });
  };

  resetMenu = () => {
    this.setState({
      reset: true
    });
  };

  render() {
    return (
      <StyledNav
        className="iw-dropdown"
        ref={el => (this.nav = el)}
        {...this.props}
      >
        <List className="iw-dropdown__menu">
          {this.props.data.map((item, index) => (
            <li key={item.id} className="iw-dropdown__menuItem">
              {item.children ? (
                <Dropdown
                  list={item.children}
                  title={item.title}
                  reset={this.state.reset}
                  setActiveItem={this.setActiveItem}
                  activeItem={this.state.activeItem}
                  renderChildren={this.props.renderChildren}
                  resetMenu={this.resetMenu}
                />
              ) :
                (function (thisElement, reset) {
                  // This function takes an incoming element and add stuff
                  // className needs to check to see if we have original classes
                  return React.cloneElement(thisElement, {
                    onClick: reset,
                    className: `${!thisElement.props.className.split(' ').includes('iw-dropdown__menuLink') ? 'iw-dropdown__menuLink ' : ''}${thisElement.props.className}`
                  })
                })(this.props.renderLink(item), this.resetMenu)
              }
            </li>
          ))}
        </List>
      </StyledNav>
    );
  }
}

DropdownMenu.defaultProps = {
  data: [],
  renderLink: (data) => <a className="iw-dropdown__menuLink" href={data.url}>{data.title}</a>,
  renderChildren: (children, toggleMenu, focusElement, blurElement) =>
    children.map(child => (
      <li className="iw-dropdown__subItem">
        <a
          href={child.url}
          className="iw-dropdown__subLink"
          onFocus={() => focusElement()}
          onBlur={async () => {
            const temp = await blurElement();
            if (temp.length === 0) {
              toggleMenu();
            }
          }}
        >
          {child.title}
        </a>
      </li>
    ))
}


export default DropdownMenu;
