import React            from 'react';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';

const MapScreen = (props) => {

    return (
        <WLayout wLayout="header-side">
            <WLHeader>
                <div className='map-window'>
                    <div className='map-head-spacer'></div>
                    <div className="map-header">
                    Your Maps
                    </div>
                </div>
            </WLHeader>
            <WLSide>
                
            </WLSide>
            <WLMain>

            </WLMain>

        </WLayout>

    );
};

export default MapScreen;