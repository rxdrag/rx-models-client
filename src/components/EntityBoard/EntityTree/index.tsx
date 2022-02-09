import React, { memo } from "react";
import { Box, Button, SvgIcon, Theme, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import { EntityTreeView } from "./EntityTreeView";
import intl from "react-intl-universal";
import { Graph } from "@antv/x6";
import { useScrollbarStyles } from "theme/useScrollbarStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexFlow: "column",
      borderRight: `solid 1px ${theme.palette.divider}`,
      width: "280px",
    },
    miniMap: {
      borderTop: `solid 1px ${theme.palette.divider}`,
    },
  })
);

export const EntityTree = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const classes = useStyles();
  const scrollStyles = useScrollbarStyles();
  return (
    <div className={classes.root}>
      <Box
        sx={{
          height: (theme) => theme.spacing(6),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: (theme) => theme.palette.divider + " solid 1px",
          pl: 2,
          pr: 2,
        }}
      >
        <Typography>{intl.get("entity-model")}</Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={
            <SvgIcon>
              <path
                fill="currentColor"
                d="M16 12C16 10.89 15.55 9.89 14.83 9.17L16.24 7.76C17.33 8.85 18 10.35 18 12C17.28 12 16.6 12.13 15.96 12.36C15.97 12.24 16 12.12 16 12M20 12.34C20.68 12.59 21.33 12.96 21.88 13.43C21.95 12.96 22 12.5 22 12C22 9.24 20.88 6.74 19.07 4.93L17.66 6.34C19.11 7.78 20 9.79 20 12C20 12.12 20 12.23 20 12.34M12 10C10.9 10 10 10.9 10 12S10.9 14 12 14 14 13.1 14 12 13.1 10 12 10M6.34 6.34L4.93 4.93C3.12 6.74 2 9.24 2 12S3.12 17.26 4.93 19.07L6.34 17.66C4.89 16.22 4 14.22 4 12C4 9.79 4.89 7.78 6.34 6.34M7.76 7.76C6.67 8.85 6 10.35 6 12S6.67 15.15 7.76 16.24L9.17 14.83C8.45 14.11 8 13.11 8 12S8.45 9.89 9.17 9.17L7.76 7.76M19 14H17V17H14V19H17V22H19V19H22V17H19V14Z"
              />
            </SvgIcon>
          }
        >
          {intl.get("add-node")}
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 1,
          ...scrollStyles,
        }}
      >
        <EntityTreeView graph={graph} />
      </Box>
      <div className={classes.miniMap} id="mini-map"></div>
    </div>
  );
});
