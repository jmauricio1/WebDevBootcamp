import React from 'react';

function Footer(){
    let date = new Date();
    const year = date.getFullYear();

    return (
        <footer>
            <p>&#169; joshm.dev {year}</p>
        </footer>
    );
}

export default Footer;