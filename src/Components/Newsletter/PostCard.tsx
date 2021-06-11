import { CardHeader, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React from "react";
import { conditionalLength } from "../UserControl";
// import customTheme from "../../CustomTheme";
import { BlogPost } from "./NewsletterPage";

interface Props {
  blogPost: BlogPost;
  onClick: () => void;
}

export default function OutlinedCard({ blogPost, onClick }: Props) {
  // const classes = useStyles();

  return (
    <Card className="root" variant="outlined">
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={onClick}>
            <MoreHorizIcon />
          </IconButton>
        }
        title={conditionalLength(blogPost.title, 20)}
        subheader={`Blog no ${blogPost.id}`}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {conditionalLength(blogPost.body, 80)}
        </Typography>
      </CardContent>
    </Card>
  );
}
