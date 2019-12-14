import React from 'react';

import styles from './Card.module.scss';
import { CardProps } from './interfaces';

class Card extends React.Component<CardProps, { minutes?: number, secs?: number }> {
    constructor(props: CardProps) {
        super(props);
        this.state = { minutes: 0, secs: 0 };
    }

    render() {
        return (
            <div className={styles.Card}>
                <div className={styles.Card__Header}>
                    <div className={styles.Card__Header__ImgContainer}>
                        <img src={this.props.imgUrl} alt='header' className={styles.Card__Header__ImgContainer__Img}/>
                    </div>
                </div>
                <div className={styles.Card__Body}>
                    <div>
                        <div className={styles.Card__Body__Title}>
                            {this.props.name}
                        </div>
                        <div className={styles.Card__Body__SubTitle}>
                            {this.props.scientificName}
                        </div>
                    </div>
                    <div>
                        <div className={styles.Card__Body__Charge}>
                            <span>Rate : </span>{this.props.rate}<span>/Kg</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;