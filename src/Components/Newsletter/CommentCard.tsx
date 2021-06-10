import { CardHeader, IconButton, Tooltip } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import React from "react";
// import customTheme from "../../CustomTheme";
import Button from "../formComponents/Button";
import { Comment } from "./PostDetails";
import { conditionalLength } from "../UserControl";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
  comment: Comment;
  onClick: () => void;
  isFullBody: boolean;
}

export default function CommentCard({ comment, onClick, isFullBody }: Props) {
  const bull = <span className="bullet">•</span>;

  return (
    <Card className="root" variant="outlined">
      <CardContent>
        <Tooltip
          className="hoverEmail"
          title={comment.email}
          placement="top-end"
          TransitionComponent={Zoom}
          TransitionProps={{ timeout: 800 }}
        >
          <CardHeader
            action={
              <IconButton aria-label="settings" onClick={onClick}>
                {isFullBody ? <CloseIcon /> : <MoreHorizIcon />}
              </IconButton>
            }
            title={
              isFullBody ? comment.name : conditionalLength(comment.name, 20)
            }
          />
        </Tooltip>

        <Typography variant="body2" component="p">
          {isFullBody ? comment.body : conditionalLength(comment.body, 60)}
        </Typography>
      </CardContent>
    </Card>
  );
}
