import React, { useState } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

const MatchesList = ({ matches, loading }) => {

    const[ matchesData, setMatchesData ] = useState({
        matches: matches,
        loading: loading
    })

    if (!matchesData.loading && matchesData.matches)
        return (
            <div>
                {
                    matchesData.matches.map((match) => 
                    <ListItem button key={match.id}>
                        <ListItemText primary={match.username} />
                    </ListItem>
                )}
            </div>
        );
    else
        return (
            <div>
                
            </div>
        )
}

export default MatchesList
