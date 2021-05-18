import React            from 'react';
import Globe            from '../../globe.png'
import { WLayout, WLHeader, WLMain, WLSide, WButton, WRow, WCol } from 'wt-frontend';
import MapSide          from '../sidebar/MapSide'

const MapScreen = (props) => {

    return (
        <div className="map-window">
        <WLayout wLayout="header">
            <WLHeader>
                <div className='map-head-spacer'></div>
                <div className="map-header">
                    Your Maps
                </div>
            </WLHeader>
            <WRow>
                <WCol className="scroll" size="6">
                    <MapSide listIDs={props.listIDs} auth={props.auth} handleSetActive={props.handleSetActive}
					    createNewMap={props.createNewMap} updateMapField={props.updateMapField} key={props.key} 
                        setShowDelete={props.setShowDelete} setShowRegion={props.setShowRegion}/>
                </WCol>
                <WCol size="6">
                    <img src={Globe} className='map-globe'></img>
                    {
                        props.auth && <div>
                            <WButton className="map-button" onClick={props.createNewMap}>
                                Create New Map
                            </WButton>

                        </div>
                    }
                </WCol>

            </WRow>

        </WLayout>
        </div>

    );
};

export default MapScreen;