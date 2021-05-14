import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "../formComponents/Button";
import customTheme from "../../CustomTheme";
import { BlogPost } from "./NewsletterPage";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    boxShadow: "7px 7px 11px -4px #424242",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  blogTitle: {
    color: customTheme.palette.primary.main,
  },
  blogNo: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface Props {
  blogPost: BlogPost;
  onClick: () => void;
}

export default function OutlinedCard({ blogPost, onClick }: Props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.blogNo}
          color="textSecondary"
          gutterBottom
        >
          Blog no {blogPost.id}
        </Typography>
        <Typography className={classes.blogTitle} variant="h5" component="h2">
          {bull}
          {blogPost.title}
          {bull}
        </Typography>

        <Typography variant="body2" component="p">
          {blogPost.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          onClick={onClick}
          text="Learn More"
        ></Button>
      </CardActions>
    </Card>
  );
}
