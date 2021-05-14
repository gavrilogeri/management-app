import { Tooltip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import React from "react";
import customTheme from "../../CustomTheme";
import Button from "../formComponents/Button";
import { Comment } from "./PostDetails";

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
  hoverEmail: {
    fontSize: 25,
  },
});

interface Props {
  comment: Comment;
  onClick: () => void;
  isFullBody: boolean;
}
export default function CommentCard({ comment, onClick, isFullBody }: Props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const conditionalBody = (body: string): string => {
    return body.length > 15 ? body.substring(0, 15).concat("...") : body;
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Tooltip
          className={classes.hoverEmail}
          title={comment.email}
          placement="top-end"
          TransitionComponent={Zoom}
          TransitionProps={{ timeout: 800 }}
        >
          <Typography className={classes.blogTitle} variant="h6" component="h6">
            {comment.name}
          </Typography>
        </Tooltip>
        <Typography variant="body2" component="p">
          {isFullBody ? comment.body : conditionalBody(comment.body)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          onClick={onClick}
          text={isFullBody ? "Close" : "Read More"}
        ></Button>
      </CardActions>
    </Card>
  );
}
