import { Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import React from 'react'
import customTheme from '../../CustomTheme';
import Button from '../formComponents/Button';


export default function CommentPopup(props: any) {

    const { title, children, openFullComent, setOpenFullComment, setValues, body } = props;

    return (
        <Dialog open={openFullComent} maxWidth="md">
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, padding: 15, fontWeight: 700, color: customTheme.palette.primary.main }}>
                        {title}
                    </Typography>


                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
