import React from 'react';
import '../styles/Button.css';
import { Link } from 'react-router-dom';

/**
 * Constant styles for buttons that use this component.
 * @type {string[]} classname for the button element.
 */
const STYLES = ['btn--primary', 'btn--outline', 'btn--details', 'btn--forgot'];

/**
 * Buttons font size and padding is changed according to which SIZE the button has.
 * @type {string[]} classname for the button element.
 */
const SIZES = ['btn--medium', 'btn--large'];

/**
 * HTML <button> element component.
 * @param children text inside the button.
 * @param to where the button links to.
 * @param type buttons type (submit, reset etc..)
 * @param onClick method given to the button when clicked.
 * @param buttonStyle button style attribute.
 * @param buttonSize buttons size attribute.
 * @returns {JSX.Element} Link that has inside of it a button element.
 * @constructor creates the element with Link that has a button element with the given params.
 */
export const Button = ({
                           children,
                           to,
                           type,
                           onClick,
                           buttonStyle,
                           buttonSize
                       }) => {
    /**
     * Set the button style to first element in STYLES if there aren't any specified style.
     * @type {*|string} the buttons style AKA classname.
     */
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    /**
     * Set the buttons size to first element in SIZES if there aren't any specified size.
     * @type {*|string}
     */
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link to={to} className='btn-mobile'>
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </Link>
    );
};