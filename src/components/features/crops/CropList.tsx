import React from 'react';
import { connect } from 'react-redux';

import styles from './CropList.module.scss';
import { AppState } from '../../../AppState';
import { getCropList } from '../../../actions';
import { CropListProps, Crop } from './interfaces';
import Card from '../../shared/card/Card';

class CropList extends React.Component<CropListProps, {showModal: boolean}>{

    renderCrops = () => {
        if (this.props.cropList) {
            return this.props.cropList.map((el: Crop) => {
                return (
                    <div className={styles.Crops__List__Item} key={el.scientificName}>
                        <Card {...el} />
                    </div>
                );
            });
        }
        return <div style={{ minHeight: '90vh'}}></div>;
    }

    render() {
        return (
            <div className={styles.Crops}>
                <div className={styles.Crops__List}>
                    {this.renderCrops()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        cropList: state.crop && state.crop.cropList,
        currentUser: state.auth && state.auth.currentUser
    };
}

const mapDispatchToProps = {
    getCropList
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CropList);