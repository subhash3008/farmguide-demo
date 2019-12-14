import React from 'react';
import { Link } from 'react-router-dom';

import styles from './PageNotFound.module.scss';

const PageNotFound: React.FC = () => {
    return (
        <div className={styles.PageNotFound}>
            <div className={styles.PageNotFound__Text}>
                <span>Page Not Found</span>
            </div>
            <Link to="/">
                Go To Homepage
            </Link>
        </div>
    );
}

export default PageNotFound;