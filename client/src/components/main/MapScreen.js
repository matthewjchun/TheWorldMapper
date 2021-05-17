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
                <WCol size="6">
                    <div>
                        hi
                    </div>
                    <MapSide listIDs={props.listIDs} activeid={props.activeid} auth={props.auth} handleSetActive={props.handleSetActive}
					    createNewMap={props.createNewMap} updateMapField={props.updateMapField} key={props.key}/>
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
            {/* <WLSide side="left">

            </WLSide>
            <WLSide side="right">

            </WLSide> */}
            {/* <WLMain>
                <div>
                    hi
                </div>
                <MapSide listIDs={props.listIDs} activeid={props.activeid} auth={props.auth} handleSetActive={props.handleSetActive}
					createNewMap={props.createNewMap} updateMapField={props.updateMapField} key={props.key}/>
            </WLMain> */}

        </WLayout>
        </div>

    );
};

export default MapScreen;