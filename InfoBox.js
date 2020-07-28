import React from 'react';
import { Card, CardContent, Typography} from "@material-ui/core";

function InfoBox( {title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                {/*Title ie covid cases*/}
                <Typography className="infoBox_title" color="textSecondary">
                    {title}
                </Typography>
                
                {/*+120k number of cases*/}
                <h2 className="infoBox__cases">
                    {cases}
                </h2>

                {/*1.2 million total*/}
                <Typography className="infoBox__total" color ="textSecondary">
                    {total} Total 
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
