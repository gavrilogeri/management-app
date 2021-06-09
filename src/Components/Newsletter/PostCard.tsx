import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "../formComponents/Button";
// import customTheme from "../../CustomTheme";
import { BlogPost } from "./NewsletterPage";
import { CardHeader, IconButton } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { conditionalLength } from "../UserControl";

interface Props {
  blogPost: BlogPost;
  onClick: () => void;
}

export default function OutlinedCard({ blogPost, onClick }: Props) {
  // const classes = useStyles();
  const bull = <span className="bullet">•</span>;

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
