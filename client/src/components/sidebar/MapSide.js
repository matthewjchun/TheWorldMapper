import React            from 'react';
import MapEntry         from './MapEntry';
// import SidebarHeader    from './SidebarHeader';
// import SidebarList      from './SidebarList';

const MapSide = (props) => {
    let tempID = 0
    return (
        <>
            {
                props.listIDs &&
                props.listIDs.map(entry => (
                    <MapEntry
                        handleSetActive={props.handleSetActive}
                        id={tempID++} key={entry._id+props.activeid} name={entry.name} _id={entry._id}
                        updateListField={props.updateMapField} setShowDelete={props.setShowDelete}
                    />
                ))
            }
        </>
    );
};

export default MapSide;