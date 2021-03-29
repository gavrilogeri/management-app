import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import { Button as MuiButton } from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Button from '../formComponents/Button'
import customTheme from '../../CustomTheme';

const useStyles = makeStyles({
    root: {
        minWidth: 200,
        boxShadow: "7px 7px 11px -4px #424242"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    blogTitle: {
        color: customTheme.palette.primary.main
    },
    blogNo: {
        fontSize: 14,

    },
    pos: {
        marginBottom: 12,
    },
});

export default function OutlinedCard(props: any) {
    const { postId, title, body, onClick } = props;
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (

        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.blogNo} color="textSecondary" gutterBottom>
                    Blog no {postId}
                </Typography>
                <Typography className={classes.blogTitle} variant="h5" component="h2">
                    {bull}{title}{bull}
                </Typography>

                <Typography variant="body2" component="p">
                    {body}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="outlined" onClick={onClick} text="Learn More"></Button>
            </CardActions>
        </Card>
    );
}